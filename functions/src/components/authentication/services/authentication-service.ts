import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";


export class AuthenticationService {

    public static login(userName: string, password: string): Promise<UserAccount> {
        console.log('START: AuthenticationService.login: ' + JSON.stringify(userName));
        const RSA_PRIVATE_KEY = fs.readFileSync('./src/util/authentication/private.key');

        return AuthenticationDatabseService.readUserAccountByUserNamePassword(userName, password)
            .then(function(userAccount) {
                if (userAccount != null && userName === userAccount.userName) {
                    bcrypt.compare(password, userAccount.password, function(err, isMatch) {
                        if (err || isMatch === false) {
                            return err;
                        }

                        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                            algorithm: 'RS256',
                            expiresIn: 120,
                            subject: userAccount.uuid
                        });

                        return jwtBearerToken;
                    });
                } else {
                    throw new Error('[AuthenticationService] Bad Username or Password');
                }
                return userAccount;
            }).catch(function(error){
                throw new Error('[AuthenticationService] Error during login: ' + error);
        });
    };

    public static async register(userAccount: UserAccount): Promise<UserAccount> {
        const hashedPassword = await bcrypt.hash(userAccount.password, 10);

        if (this.isUserAccountExisting(userAccount.userName)) {
            throw new Error('[myfarmer] Cannot register the new user-account');
        }

        try {
            return AuthenticationDatabseService.createUserAccount(
                uuidGenerator(),
                userAccount.userName,
                hashedPassword,
                userAccount.email);
        } catch (error) {
            throw new Error('[myfarmer] Error create new user-account: ' + error);
        }

        return Promise.reject();
    }

    public static logout(uuidUserAccount: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    private static isUserAccountExisting(userName: string): boolean {
        AuthenticationDatabseService.readUserAccountByUserName(userName)
            .then(userAccount => {
                console.log('SUCCESSFUL: THEN isUserAccountExisting, retrun useraccount');
                return userAccount ? true : false;
            }).catch(error => {
            console.log('ERROR: CATCH isUserAccountExisting, return false');
                return false;
            });
        console.log('ERROR: isUserAccountExisting, return false');
        return false;
    }
}
