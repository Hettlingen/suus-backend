import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";
import {AuthenticationToken} from "../model/authenticationToken";


export class AuthenticationService {

    private static RSA_PUBLIC_PRIVATE_KEY = fs.readFileSync('src/utils/authentication/private.key');
    private static RSA_PUBLIC_PUBLIC_KEY = fs.readFileSync('src/utils/authentication/public.key');

    public static async login(userName: string, password: string): Promise<UserAccount> {
        // because in the jwt token the value is milliseconds or you can use "2 days", "10h", "7d"
        const jwtExpiresIn = '1h';

        // TODO use this methode validateEmailAndPassword instead of reading the user
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const match = await bcrypt.compare(password, userAccount.password);

        if (!match) {
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const jwtBearerToken = jwt.sign({}, this.RSA_PUBLIC_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: jwtExpiresIn,
            subject: userAccount.uuid
        });

        const authenticationToken = new AuthenticationToken();
        authenticationToken.token = jwtBearerToken;
        authenticationToken.tokenExpiresIn = jwtExpiresIn;
        userAccount.authenticationToken = authenticationToken;

        return userAccount;
    };

    public static async register(userAccount: UserAccount): Promise<UserAccount> {
        const hashedPassword = await bcrypt.hash(userAccount.password, 10);

        if (this.isUserAccountExisting(userAccount.userName)) {
            throw new Error('[myfarmer] AuthenticationService.register - UserAccount is already existing');
        }

        try {
            return AuthenticationDatabseService.createUserAccount(
                uuidGenerator(),
                userAccount.userName,
                hashedPassword,
                userAccount.email);
        } catch (error) {
            throw new Error('[myfarmer] AuthenticationService.register - Error create new user-account: ' + error);
        }
    }

    public static logout(uuidUserAccount: string): Promise<boolean> {
        return Promise.resolve(true);
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

    // @ts-ignore
    private static validateEmailAndPassword(userName: string, password: string): boolean {
        return true;
    }

    public static checkIfAuthenticated(request: any, response: any, next: any) {
        console.log('START AuthenticationService.checkIfAuthenticated: ' + this.RSA_PUBLIC_PUBLIC_KEY);

        // We take the second part of the bearer token 'Bearer abdslfjksf....'
        const token = request.headers.authorization.split(' ')[1];
        console.log('Das Bearer Token lautet: ' + token);

        if (!token) {
            return request.status(401).json({ message: '[myfarmer] Missing Authorization Header' });
        }

        try {
            jwt.verify(token, this.RSA_PUBLIC_PUBLIC_KEY);
            next();
        } catch(error) {
            response.status(401).json({ message: '[myfarmer] Missing Authorization Header' });
        }
    };
}
