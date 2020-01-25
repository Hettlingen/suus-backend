import {UserAccount} from "../../model/user-account";
import {databaseUserAccount} from "../../../../index";

export class AuthenticationDatabseService {

    static async createUserAccount(uuid: string, userName: string, hashedPassword: string, email: string): Promise<UserAccount> {
        const query = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${uuid}', '${userName}', '${hashedPassword}', '${email}')`;

        try {
            const uuidFromDb = await databaseUserAccount.query(query);

            if (!uuidFromDb) throw new Error('[myfarmer] Error inserting user-account from database.');

            return uuidFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] Error execute insert-query user-account: ' + error);
        }
    }

    static async readUserAccountByUuid(uuidUserAccount: string): Promise<UserAccount> {
        if (!uuidUserAccount) throw new Error('[myfarmer] UserAccount-ID is required');

        const query = `SELECT * FROM UserAccount WHERE uuid='${uuidUserAccount}'`;

        try {
            const userAccountFromDb = await databaseUserAccount.query(query);
            return userAccountFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] Error reading user-account from database: ' + error);
        }
    }

    static async readUserAccountByUserName(userName: string): Promise<UserAccount> {
        if (!userName) throw new Error('[myfarmer] Wrong parameters');

        const query = `SELECT * FROM UserAccount WHERE userName='${userName}'`;

        try {
            const userAccountFromDb = await databaseUserAccount.query(query);

            if (!userAccountFromDb) {
                console.log('ERROR: reading useraccount');
                throw new Error('[myfarmer] Error sql user-account from database');
            }

            console.log('SUCCESSFUL: UserAccount found ' + userAccountFromDb[0]);
            return userAccountFromDb[0];
        } catch(error) {
            console.log('ERROR: reading useraccount catch');
            throw new Error('[myfarmer] Error reading user-account from database: ' + error);
        }
    }

    // static updateUserAccount(): UserAccount {
    //     return null;
    // }
    //
    // static deleteUserAccount(): UserAccount {
    //     return null;
    // }
}