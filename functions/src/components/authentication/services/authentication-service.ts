import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";


export class AuthenticationService {

    public static async login(userName: string, password: string): Promise<UserAccount> {
        console.log('START: AuthenticationService.login: ' + JSON.stringify(userName));
        const RSA_PRIVATE_KEY = fs.readFileSync('./src/util/authentication/private.key');
        // because in the jwt token the value is milliseconds or you can use "2 days", "10h", "7d"
        const jwtExpiresIn = '8h';

        // TODO use this methode validateEmailAndPassword

        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const match = await bcrypt.compare(password, userAccount.password);

        if (!match) {
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: jwtExpiresIn,
            subject: userAccount.uuid
        });

        userAccount.authenticationToken.token = jwtBearerToken;
        userAccount.authenticationToken.tokenExpiresIn = jwtExpiresIn;

        return userAccount;
    };

    public static async register(userAccount: UserAccount): Promise<UserAccount> {
        const hashedPassword = await bcrypt.hash(userAccount.password, 10);

        // if (this.isUserAccountExisting(userAccount.userName)) {
        //     throw new Error('[myfarmer] AuthenticationService.register - UserAccount is already existing');
        // }

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
        const userAccount = await AuthenticationDatabseService.readUserAccountByUuid(uuidUserAccount);

        if (userAccount === null || userAccount === undefined) {
            throw new Error('[myfarmer] AuthenticationService.getUserAccount - User-Account not found');
        }

        return userAccount;
    }

    // @ts-ignore
    private static async isUserAccountExisting(userName: string): Promise<boolean> {
        try {
            const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

            if (userAccount) {
                console.log('isUserAccountExisting => true: ' + JSON.stringify(userAccount));
                return true;
            }

            console.log('isUserAccountExisting => false: ' + JSON.stringify(userAccount));
            return false;
        } catch (error) {
            console.log('isUserAccountExisting => false');
            return false;
        }
    }

    // @ts-ignore
    private static validateEmailAndPassword(userName: string, password: string): boolean {
        return true;
    }
}
