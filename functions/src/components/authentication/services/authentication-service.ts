import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";
import {AuthenticationToken} from "../model/authenticationToken";


export class AuthenticationService {

    private static RSA_PRIVATE_KEY = fs.readFileSync('src/utils/authentication/private.key');

    public static async login(userName: string, password: string): Promise<UserAccount> {
        // because in the jwt token the value is milliseconds or you can use "2 days", "10h", "7d"
        const jwtExpiresIn = '1h';

        // TODO use this methode validateEmailAndPassword instead of reading the user
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            console.log('[AuthenticationService] Bad Username or Password');
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const match = await bcrypt.compare(password, userAccount.password);

        if (!match) {
            console.log('[AuthenticationService] Bad Password');
            throw new Error('[AuthenticationService] Bad Password');
        }

        const jwtBearerToken = jwt.sign({}, this.RSA_PRIVATE_KEY, {
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

        if (await this.isUserAccountExisting(userAccount.userName)) {
            console.info('[myfarmer] AuthenticationService.register - UserAccount is already existing');
            throw new Error('[myfarmer] AuthenticationService.register - UserAccount is already existing');
        }

        try {
            return AuthenticationDatabseService.createUserAccount(
                uuidGenerator(),
                userAccount.userName,
                hashedPassword,
                userAccount.email);
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
}
