import {UserAccount} from "../../model/user-account";
import {MysqlError} from "mysql";
import {database} from "../../../../index";
import {RoleUser} from "../../../community/partner/model/roles/role-user";

export class AuthenticationDatabseService {

    /**
     * See: https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
     *
     * @param uuid
     * @param userName
     * @param hashedPassword
     * @param email
     */
    static async createUserAccount(userAccount: UserAccount): Promise<UserAccount> {
        try {
            await database.beginTransaction();

            // INSERT UserAccount
            const queryUserAccount = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${userAccount.uuid}', '${userAccount.userName}', '${userAccount.hashedPassword}', '${userAccount.email}')`;
            await database.query(queryUserAccount);

            // INSERT RoleUser
            // const queryRoleUser = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${uuidUserAccount}', '${userName}', '${hashedPassword}', '${email}')`;
            // await database.query(queryRoleUser);

            await database.commit((commitError: MysqlError) => {
                if (commitError !== null) {
                    throw new Error('[myfarmer] Error commit insert-query user-account: ' + commitError.message);
                }
                return this.readUserAccountByUuid(userAccount.uuid);
            });
        } catch ( err ) {
            await database.rollback((rollbackError: MysqlError) => {
                if (rollbackError !== null) {
                    throw new Error('[myfarmer] Error rollback insert-query user-account: ' + rollbackError.message);
                }
            });
        } finally {
            await database.close();
        }

        return new UserAccount('','','','')
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

    static async createRoleUser(roleUser: RoleUser): Promise<RoleUser> {
        return new RoleUser();
    }
}
