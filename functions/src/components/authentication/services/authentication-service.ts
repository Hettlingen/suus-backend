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
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const match = await bcrypt.compare(password, userAccount.password);

        if (!match) {
            throw new Error('[AuthenticationService] Bad Username or Password');
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
        console.log('START AuthenticationService.checkIfAuthenticated');

        // We take the second part of the bearer token 'Bearer abdslfjksf....'
        let token = '';
        const bearerToken = request.headers['authorization']; // Express headers are auto converted to lowercase

        console.log('Bearer Token: ' + bearerToken);

        if (bearerToken.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = bearerToken.slice(7, bearerToken.length);
        }

        console.log('Token without text Bearer: ' + token);

        if (!token) {
            return request.status(401).json({ message: '[myfarmer] Missing authorization header' });
        }

        try {
            jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256']});
            console.log('Token was verified');
            next();
        } catch(error) {
            console.log('Error verifing token: ' + error);
            response.status(401).json({ message: '[myfarmer] Couldnt verify the authorization header' });
        }
    };
}
