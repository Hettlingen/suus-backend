import {UserAccount} from '../model/user-account';
import {v4 as uuidGenerator} from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";
import {AuthenticationToken} from "../model/authenticationToken";
import {RoleUser} from "../../partner/model/roles/role-user";
import * as functions from 'firebase-functions'
import {ErrorService} from "../../../../utils/error/error-service";
import {ErrorServiceCodes, getErrorCode} from "../../../../utils/error/error-service-codes";
import {UserSettings} from "../../partner/model/user-settings";
import {LanguageCode} from "../../../workplace/model/codes/language-code";
import {ShoppingCart} from "../../../shop/model/order/shopping-cart";
import {Partner} from "../../partner/model/partner";
import {Address} from "../../partner/model/address";
import {CountryCode} from "../../partner/model/country-code";

export class AuthenticationService {

    public static async login(userName: string, password: string): Promise<RoleUser> {
        console.info('START AuthenticationService.login with user-name: ' + userName);
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            console.log('[AuthenticationService] Bad Username');
            throw new ErrorService(
                '[AuthenticationService.login] Bad Username',
                getErrorCode(ErrorServiceCodes.BAD_USERNAME), null);
        }

        try {
            const authenticationToken = await this.verifyPassword(password, userAccount.password, userAccount.uuid);
            const roleUser = await AuthenticationDatabseService.readUserByUserAccountUuid(userAccount.uuid);
            roleUser.userAccount.authenticationToken = authenticationToken;
            return roleUser;
        } catch (error) {
            console.log('[AuthenticationService.login] Error login user: ' + error);
            throw new ErrorService(
                '[AuthenticationService.login] Not authorized',
                getErrorCode(ErrorServiceCodes.NOT_AUTHORIZED),
                error);
        }
    };

    public static async registerUser(userAccount: UserAccount): Promise<UserAccount> {
        console.info('START AuthenticationService.register for user: ' + userAccount.userName);
        if (await this.isUserAccountExisting(userAccount.userName)) {
            throw new ErrorService(
                '[AuthenticationService.register] UserAccount is already existing with user-name: ' + userAccount.userName,
                getErrorCode(ErrorServiceCodes.USER_ACCOUNT_ALREADY_EXISTING), null);
        }

        userAccount.uuid = uuidGenerator();
        userAccount.hashedPassword = await bcrypt.hash(userAccount.password, 10);
        userAccount.dateCreated = new Date();
        userAccount.dateUpdated = new Date();

        const roleUser = new RoleUser();
        roleUser.uuid = uuidGenerator();
        roleUser.dateCreated = new Date();
        userAccount.roleUser = roleUser;

        const partner = new Partner();
        partner.uuid = uuidGenerator();
        partner.nickname = 'Avatar';
        partner.listRole.push(roleUser);
        roleUser.partner = partner;

        const address = new Address();
        address.uuid = uuidGenerator();
        address.countryCode = CountryCode.SWITZERLAND;
        roleUser.address = address;

        const settings = new UserSettings();
        settings.uuid = uuidGenerator();
        settings.notificationYesNo = true;
        settings.newsletterYesNo = true;
        // TODO get language code of header
        settings.languageApplicationCode = LanguageCode.GERMAN;
        roleUser.userSettings = settings;

        const shoppingCart = new ShoppingCart();
        shoppingCart.uuid = uuidGenerator();
        roleUser.shoppingCart = shoppingCart;

        try {
            return AuthenticationDatabseService.createUserAccount(userAccount);
        } catch (error) {
            console.log('[AuthenticationService.register] Error register user: ' + error);
            throw new ErrorService(
                '[AuthenticationService.register] Error register new user with user-name: ' + userAccount.userName,
                getErrorCode(ErrorServiceCodes.USER_ACCOUNT_NOT_CREATED),
                error);
        }
    }

    public static async deregisterUser(uuidUserAccount: string): Promise<boolean> {
        console.info('START AuthenticationService.deregister for user: ' + uuidUserAccount);

        try {
            return AuthenticationDatabseService.deleteUserAccount(uuidUserAccount);
        } catch (error) {
            console.log('[AuthenticationService.register] Error deregister user: ' + error);
            throw new ErrorService(
                '[AuthenticationService.register] Error deregister user with user-name: ' + uuidUserAccount,
                getErrorCode(ErrorServiceCodes.USER_ACCOUNT_NOT_CREATED),
                error);
        }
    }

    public static async getUserAccount(uuidUserAccount: string): Promise<UserAccount> {
        console.log('START AuthenticationService.getUserAccount with uuid: ' + uuidUserAccount);

        const userAccount = await AuthenticationDatabseService.readUserAccountByUuid(uuidUserAccount);

        if (userAccount === null || userAccount === undefined) {
            throw new Error('[myfarmer] AuthenticationService.getUserAccount - User-Account not found');
        }

        return userAccount;
    }

    public static async updateUser(roleUser: RoleUser): Promise<RoleUser> {
        console.log('START AuthenticationService.updateUser');

        // TODO Update user on database
        return new RoleUser();
    }

    public static async getUser(uuidRoleUser: string): Promise<RoleUser> {
        console.info('START AuthenticationService.getUser: ' + uuidRoleUser);

        const roleUser = await AuthenticationDatabseService.readUserByUuid(uuidRoleUser);

        if (roleUser === null || roleUser === undefined) {
            throw new Error('[myfarmer] AuthenticationService.getUser - User not found');
        }

        return roleUser;
    }

    private static async isUserAccountExisting(userName: string): Promise<boolean> {
        console.info('START AuthenticationService.isUserAccountExisting: ' + userName);
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined) {
            console.info('[AuthenticationService.isUserAccountExisting] User-account is not existing with user-name: ' + userName);
            return false;
        }

        console.info('[AuthenticationService.isUserAccountExisting] UserAccount is already existing');
        return true;
    }

    public static checkIfAuthenticated(request: any, response: any, next: any) {
        console.info('START AuthenticationService.checkIfAuthenticated');
        const PUBLIC_KEY = functions.config().jwt.publickey;

        let token = '';
        // Express headers are auto converted to lowercase
        const bearerToken = request.headers['authorization'];

        if (bearerToken === null || bearerToken === undefined) {
            console.log('[AuthenticationService.checkIfAuthenticated] Missing authorization header');
            return request.status(401).json({ message: '[myfarmer] Missing authorization header' });
        }

        if (bearerToken.startsWith('Bearer')) {
            // Remove Bearer from string
            token = bearerToken.slice(7, bearerToken.length);
        }

        if (!token) {
            return request.status(401).json({ message: '[AuthenticationService.checkIfAuthenticated] Missing authorization header' });
        }

        jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256']}, (err, payload) => {
            if (err) {
                console.error('[AuthenticationService.checkIfAuthenticated] Couldnt verify the authorization header');
                response.status(401).json({ message: '[AuthenticationService.checkIfAuthenticated] Couldnt verify the authorization header' });
            }

            // if the JWT is valid, allow them to go to the intended endpoint
            return next();
        });
    };

    private static  async verifyPassword(passwordInput: string, passwordUserAccount: string, uuidUserAccount: string): Promise<AuthenticationToken> {
        const PRIVATE_KEY = functions.config().jwt.privatekey;

        // because in the jwt token the value is milliseconds or you can use "2 days", "10h", "7d"
        const jwtExpiresIn = '1h';
        const match = await bcrypt.compare(passwordInput, passwordUserAccount);

        if (!match) {
            console.log('[AuthenticationService] Bad Username or Password');
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: jwtExpiresIn,
            subject: uuidUserAccount
        });

        const authenticationToken = new AuthenticationToken();
        authenticationToken.token = jwtBearerToken;
        authenticationToken.tokenExpiresIn = jwtExpiresIn;
        return authenticationToken;
    }
}
