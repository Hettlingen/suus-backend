import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import {databaseUserAccount} from "../../../index";


export class AuthenticationService {

    RSA_PRIVATE_KEY = fs.readFileSync('./src/util/authentication/private.key');

    static login(userName: string, password: string): Promise<UserAccount> {
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

    static logout(uuidUserAccount: string): Promise<boolean> {
        return Promise.resolve(true);
    }

    static async register(userAccount: UserAccount): Promise<UserAccount> {
        userAccount.uuid = uuidGenerator();

        const query = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES (${userAccount.uuid}, ${userAccount.userName}, ${userAccount.password}, ${userAccount.email});`;

        try {
            const uuidFromDb = await databaseUserAccount.query(query);

            console.log('UUID lautet: ' + uuidFromDb);

            if (!uuidFromDb) throw new Error('[myfarmer] Error inserting user-account from database.');
            return uuidFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] Error reading shop from database: ' + error);
        }

        // bcrypt.hash(userAccount.password, 10, function (error, hash) {
        //     console.log('Der hash-Wert lautet: ' + hash);
        //
        //     const query = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES (${userAccount.uuid}, ${userAccount.userName}, ${userAccount.password}, ${userAccount.email});`;
        //
        //     const uuid = databaseUserAccount.query(query)
        //         .then()
        //         .catch();
        //
        //     console.log('Die uuid lautet: ' + uuid);
        //
        //     if (!uuid) throw new Error('[myfarmer] Error inserting user-account from database.');
        // });

        return Promise.reject();
    }
}
