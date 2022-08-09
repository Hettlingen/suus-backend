import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";
import {AuthenticationToken} from "../model/authenticationToken";
import {RoleUser} from "../../partner/model/roles/role-user";
const path = require('path');

export class AuthenticationService {

    public static async login(userName: string, password: string): Promise<RoleUser> {
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            console.log('[AuthenticationService] Bad Username or Password');
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        try {
            const authenticationToken = await this.verifyPassword(password, userAccount.password, userAccount.uuid);
            const roleUser = await AuthenticationDatabseService.readUserByUserAccountUuid(userAccount.uuid);
            roleUser.userAccount.authenticationToken = authenticationToken;
            return roleUser;
        } catch (error) {
            console.log('[myfarmer] AuthenticationService.login - Error login user: ' + error);
            throw new Error('[myfarmer] AuthenticationService.login - Error login user: ' + error);
        }
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
            console.log('[myfarmer] AuthenticationService.register - Error register user: ' + error);
            throw new Error('[myfarmer] AuthenticationService.register - Error register user: ' + error);
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

    public static async updateUser(roleUser: RoleUser): Promise<RoleUser> {
        console.log('START AuthenticationService.updateUser');

        // TODO Update user on database
        return new RoleUser();
    }

    public static async getUser(uuidRoleUser: string): Promise<RoleUser> {
        console.log('START AuthenticationService.getUser: ' + uuidRoleUser);

        const roleUser = await AuthenticationDatabseService.readUserByUuid(uuidRoleUser);

        if (roleUser === null || roleUser === undefined) {
            throw new Error('[myfarmer] AuthenticationService.getUser - User not found');
        }

        return roleUser;
    }

    private static async isUserAccountExisting(userName: string): Promise<boolean> {
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined) {
            return false;
        }

        return true;
    }

    public static checkIfAuthenticated(request: any, response: any, next: any) {
        const pathPublicKey = path.join(process.cwd(), 'src/configuration/json-web-token-keys/public.key');
        const PUBLIC_KEY = fs.readFileSync(pathPublicKey);

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

        jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256']}, (err, payload) => {
            if (err) {
                console.error('[myfarmer] Couldnt verify the authorization header');
                response.status(401).json({ message: '[myfarmer] Couldnt verify the authorization header' });
            }

            // if the JWT is valid, allow them to go to the intended endpoint
            return next();
        });
    };

    private static  async verifyPassword(passwordInput: string, passwordUserAccount: string, uuidUserAccount: string): Promise<AuthenticationToken> {
        const pathPrivateKey = path.join(process.cwd(), 'src/configuration/json-web-token-keys/private.key');
        const PRIVATE_KEY = fs.readFileSync(pathPrivateKey);

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
