import {UserAccount} from "../../model/user-account";
import {FieldInfo, MysqlError} from "mysql";
import {database} from "../../../../index";

export class AuthenticationDatabseService {

    static async createUserAccount(uuid: string, userName: string, hashedPassword: string, email: string): Promise<UserAccount> {
        const query = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${uuid}', '${userName}', '${hashedPassword}', '${email}')`;

        await database.beginTransaction(async (error: MysqlError) => {
            if (error !== null) {
                throw new Error('[myfarmer] Error execute insert-query user-account: ' + error.message);
            }

            await database.query(query, async (queryError: MysqlError | null, results: any, fields: FieldInfo[] | undefined) => {
                if (queryError !== null) {
                    await database.rollback((rollbackError: MysqlError) => {
                        if (rollbackError !== null) {
                            throw new Error('[myfarmer] Error rollback insert-query user-account: ' + rollbackError.message);
                        } else {
                            throw new Error('[myfarmer] Error execute insert-query user-account: ' + queryError.message);
                        }
                    });
                } else {
                    await database.commit((commitError: MysqlError) => {
                        if (commitError !== null) {
                            throw new Error('[myfarmer] Error commit insert-query user-account: ' + commitError.message);
                        }
                        return results[0];
                    });
                }
            });
        });

        throw new Error('[myfarmer] Unknown error insert-query user-account');
    }

    static async readUserAccountByUuid(uuidUserAccount: string): Promise<UserAccount> {
        if (!uuidUserAccount) throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUuid - Wrong parameters');

        const query = `SELECT * FROM UserAccount WHERE uuid='${uuidUserAccount}'`;

        try {
            const userAccountFromDb = await database.query(query);
            return userAccountFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUuid - Error reading user-account from database: ' + error);
        }
    }

    static async readUserAccountByUserName(userName: string): Promise<UserAccount> {
        if (!userName) throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUserName - Wrong parameters');

        const query = `SELECT * FROM UserAccount WHERE userName='${userName}'`;

        try {
            const userAccountFromDb = await database.query(query);
            return userAccountFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUserName - Error reading user-account from database: ' + error);
        }
    }
}
