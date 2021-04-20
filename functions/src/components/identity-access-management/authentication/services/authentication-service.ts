import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";
import {AuthenticationToken} from "../model/authenticationToken";
import {Partner} from "../../partner/model/partner";


export class AuthenticationService {

    private static RSA_PRIVATE_KEY = fs.readFileSync('src/utils/authentication/private.key');

    public static async login(userName: string, password: string): Promise<Partner> {
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            console.log('[AuthenticationService] Bad Username or Password');
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const authenticationToken = this.verifyPassword(password, userAccount.password, userAccount.uuid);

        const roleUser = await AuthenticationDatabseService.readUserByUserAccountUuid(userAccount.uuid);
        roleUser.userAccount.authenticationToken = authenticationToken;
        return roleUser.partner;
    };

    public static async register(userAccount: UserAccount): Promise<UserAccount> {
        if (await this.isUserAccountExisting(userAccount.userName)) {
            console.info('[myfarmer] AuthenticationService.register - UserAccount is already existing');
            throw new Error('[myfarmer] AuthenticationService.register - UserAccount is already existing');
        }

        userAccount.uuid = uuidGenerator();
        userAccount.hashedPassword = await bcrypt.hash(userAccount.password, 10);

        try {
            return AuthenticationDatabseService.createUserAccount(userAccount);
        } catch (error) {
            console.log('[myfarmer] AuthenticationService.register - Error create new user-account: ' + error);
            throw new Error('[myfarmer] AuthenticationService.register - Error create new user-account: ' + error);
        }
    }

    public static async getUserAccount(uuidUserAccount: string): Promise<UserAccount> {
        console.log('START AuthenticationService.getUserAccount: ' + uuidUserAccount);

        const userAccount = await AuthenticationDatabseService.readUserAccountByUuid(uuidUserAccount);

        if (userAccount === null || userAccount === undefined) {
            throw new Error('[myfarmer] AuthenticationService.getUserAccount - User-Account not found');
        }

        return userAccount;
    }

    private static async isUserAccountExisting(userName: string): Promise<boolean> {
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined) {
            return false;
        }

        return true;
    }

    public static checkIfAuthenticated(request: any, response: any, next: any) {
        const RSA_PUBLIC_KEY = fs.readFileSync('src/utils/authentication/public.key');

        let token = '';
        // Express headers are auto converted to lowercase
        const bearerToken = request.headers['authorization'];

        if (bearerToken === null || bearerToken === undefined) {
            console.log('[myfarmer] Missing authorization header');
            return request.status(401).json({ message: '[myfarmer] Missing authorization header' });
        }

        if (bearerToken.startsWith('Bearer')) {
            // Remove Bearer from string
            token = bearerToken.slice(7, bearerToken.length);
        }

        if (!token) {
            return request.status(401).json({ message: '[myfarmer] Missing authorization header' });
        }

        jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256']}, (err, payload) => {
            if (err) {
                console.error('[myfarmer] Couldnt verify the authorization header');
                response.status(401).json({ message: '[myfarmer] Couldnt verify the authorization header' });
            }

            // if the JWT is valid, allow them to go to the intended endpoint
            return next();
        });
    };

    private static verifyPassword(passwordInput: string, passwordUserAccount: string, uuidUserAccount: string): AuthenticationToken {
        // because in the jwt token the value is milliseconds or you can use "2 days", "10h", "7d"
        const jwtExpiresIn = '1h';
        const match = bcrypt.compare(passwordInput, passwordUserAccount);

        if (!match) {
            console.log('[AuthenticationService] Bad Username or Password');
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const jwtBearerToken = jwt.sign({}, this.RSA_PRIVATE_KEY, {
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
