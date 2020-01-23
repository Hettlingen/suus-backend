import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import {databaseUserAccount} from "../../../index";


export class AuthenticationService {

    RSA_PRIVATE_KEY = fs.readFileSync('./src/util/authentication/private.key');

    static login(userName: string, password: string): Promise<UserAccount> {
        console.log('START: AuthenticationService.login: ' + JSON.stringify(userName));
        return Promise.resolve(new UserAccount('1', 'Martin', 'scoop', 'martinbraun@scoop.ch'));
    //     return AuthenticationServiceMysql.readUserAccountByUserNamePassword(userName, password)
    //         .then(function(userAccount) {
    //             if (userAccount != null && userName === userAccount.getCredentialUserNamePassword().userName) {
    //                 bcrypt.compare(password, userAccount.getCredentialUserNamePassword().password, function(err, isMatch) {
    //                     if (err || isMatch === false) {
    //                         return err;
    //                     }
    //
    //                     const jwtBearerToken = jwt.sign({}, this.RSA_PRIVATE_KEY, {
    //                         algorithm: 'RS256',
    //                         expiresIn: 120,
    //                         subject: userAccount.uuid
    //                     });
    //
    //                     return jwtBearerToken;
    //                 });
    //             } else {
    //                 throw new Error('[AuthenticationService] Bad Username or Password');
    //             }
    //             return userAccount;
    //         }).catch(function(error){
    //             throw new Error('[AuthenticationService] Error during login: ' + error);
    //     });
    };

    static async register(userAccount: UserAccount): Promise<UserAccount> {
        userAccount.uuid = uuidGenerator();

        const hashedPassword = await bcrypt.hash(userAccount.password, 10);
        const query = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${userAccount.uuid}', '${userAccount.userName}', '${hashedPassword}', '${userAccount.email}')`;

        try {
            const uuidFromDb = await databaseUserAccount.query(query);

            if (!uuidFromDb) throw new Error('[myfarmer] Error inserting user-account from database.');

            return uuidFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] Error execute insert-query user-account: ' + error);
        }

        return Promise.reject();
    }

    static logout(uuidUserAccount: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
