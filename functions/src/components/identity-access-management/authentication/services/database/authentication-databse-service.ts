import {UserAccount} from "../../model/user-account";
import {databaseConnectionPool} from "../../../../../index";
import {RoleUser} from "../../../partner/model/roles/role-user";
import {mapRoleUserFromDbToRoleUser} from "../../mapper/authentication-mapper";
import {DateUtils} from "../../../../../utils/date-utils";

export class AuthenticationDatabseService {

    /**
     * See: https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
     */
    static async createUserAccount(userAccount: UserAccount): Promise<UserAccount> {
        console.info('[AuthenticationDatabseService.createUserAccount] START');

        const roleUser = userAccount.roleUser
        const partner = roleUser.partner;
        const address = roleUser.address;
        const settings = userAccount.roleUser.userSettings;
        const shoppingCart = userAccount.roleUser.shoppingCart;

        const dateCreated = DateUtils.toSqlDatetime(new Date());
        console.log('Date created: ', dateCreated);

        const connection = await databaseConnectionPool.getConnection()
        await connection.beginTransaction();

        try {
            console.info('INSERT User-Account 11');
            const queryUserAccount = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${userAccount.uuid}', '${userAccount.userName}', '${userAccount.hashedPassword}', '${userAccount.email}')`;
            await connection.query(queryUserAccount);

            console.info('INSERT Role');
            const queryRole = `INSERT INTO Role(uuid, type, uuidPartner, uuidAddress) VALUES ('${roleUser.uuid}', '${roleUser.type}', '${partner.uuid}', '${address.uuid}')`;
            await connection.query(queryRole);

            console.info('INSERT RoleUser');
            const queryRoleUser = `INSERT INTO RoleUser(uuidRole, uuidUserAccount, uuidUserSettings, uuidShoppingCart) VALUES ('${roleUser.uuid}', '${userAccount.uuid}', '${settings.uuid}', '${shoppingCart.uuid}')`;
            await connection.query(queryRoleUser);

            console.info('INSERT Partner');
            const queryPartner = `INSERT INTO Partner(uuid, nickname ) VALUES ('${partner.uuid}', '${partner.nickname}')`;
            await connection.query(queryPartner);

            console.info('INSERT Address');
            const queryAddress = `INSERT INTO Address(uuid, countryCode ) VALUES ('${address.uuid}', '${address.countryCode}')`;
            await connection.query(queryAddress);

            console.info('INSERT Settings');
            const querySettings = `INSERT INTO SettingsUser(uuid, languageApplicationCode, notificationYesNo, newsletterYesNo ) VALUES ('${settings.uuid}', '${settings.languageApplicationCode}', '${Number(settings.notificationYesNo)}', '${Number(settings.newsletterYesNo)}')`;
            await connection.query(querySettings);

            console.info('INSERT ShoppingCart');
            const queryShoppingCart = `INSERT INTO ShoppingCart(uuid, uuidRoleUser) VALUES ('${shoppingCart.uuid}', '${roleUser.uuid}')`;
            await connection.query(queryShoppingCart);

            await connection.commit();
        } catch (error) {
            console.error('AuthenticationDatabseService.createUserAccount] ROLLBACK', error);
            await connection.rollback();
        } finally {
            connection.release();
        }

        return this.readUserAccountByUuid(userAccount.uuid);
    }

    static async deleteUserAccount(uuidUserAccount: string): Promise<boolean> {
        console.info('[AuthenticationDatabseService.deleteUserAccount] START');

        const query = `DELETE UserAccount, RoleUser 
                            FROM UserAccount 
                            LEFT JOIN Role ON RoleUser.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            LEFT JOIN UserAccount ON RoleUser.uuidUserAccount=UserAccount.uuid
                            WHERE UserAccount.uuid='${uuidUserAccount}';`;

        try {
            await databaseConnectionPool.query(query);
            return true;
        } catch(error) {
            throw new Error('[AuthenticationDatabseService.deleteUserAccount] Error execute query to delete user-account: ' + error);
        }
    }

    static async readUserAccountByUuid(uuidUserAccount: string): Promise<UserAccount> {
        if (!uuidUserAccount) throw new Error('[AuthenticationDatabseService.readUserAccountByUuid] Wrong parameters');

        const query = `SELECT * FROM UserAccount WHERE uuid='${uuidUserAccount}'`;

        try {
            const userAccountFromDb = await databaseConnectionPool.query(query);
            return userAccountFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUuid - Error reading user-account from database: ' + error);
        }
    }

    static async readUserAccountByUserName(userName: string): Promise<UserAccount> {
        if (!userName) throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUserName - Wrong parameters');

        const query = `SELECT * FROM UserAccount WHERE userName='${userName}'`;

        try {
            const userAccountFromDb = await databaseConnectionPool.query(query);
            return userAccountFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] AuthenticationDatabseService.readUserAccountByUserName - Error reading user-account from database: ' + error);
        }
    }

    static async createUser(roleUser: RoleUser): Promise<RoleUser> {
        return new RoleUser();
    }

    static async readUserByUuid(uuidRoleUser: string): Promise<RoleUser> {
        console.log('START: AuthenticationDatabseService.readUserByUuid: ' + uuidRoleUser);
        if (!uuidRoleUser) throw new Error('[myfarmer] AuthenticationDatabseService.readUserByUuid - Wrong parameters');

        const query = `SELECT RoleUser.uuidRole,
                              RoleUser.uuidAvatar,
                              RoleUser.uuidUserAccount,
                              Role.uuid uuidOfRole,
                              Role.uuidPartner uuidPartnerOfRole,
                              Role.uuidAddress uuidAddressOfRole,
                              Partner.uuid uuidOfPartner,
                              Partner.companyName companyNameOfPartner,
                              Partner.firstName firstNameOfPartner,
                              Partner.lastName lastNameOfPartner,
                              Partner.nickname nicknameOfPartner,
                              Partner.companyName companyNameOfPartner,
                              Partner.birthdate birthdateOfPartner,
                              Partner.genderCode genderCodeOfPartner,
                              Partner.languageCode languageCodeOfPartner,
                              Address.uuid uuidOfAddress,
                              Address.street streetOfAddress,
                              Address.streetNumber streetNumberOfAddress,
                              Address.city cityOfAddress,
                              Address.postalCode postalCodeOfAddress,
                              Address.countryCode countryCodeOfAddress,
                              UserAccount.uuid uuidOfUserAccount,
                              UserAccount.userName userNameOfUserAccount
                            FROM RoleUser
                            LEFT JOIN Role ON RoleUser.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            LEFT JOIN UserAccount ON RoleUser.uuidUserAccount=UserAccount.uuid
                            WHERE RoleUser.uuidRole='${uuidRoleUser}';`;

        try {
            const userFromDb = await databaseConnectionPool.query(query);
            if (userFromDb === null || userFromDb === undefined || userFromDb.length === 0) {
                const error = new Error('[myfarmer] AuthenticationDatabseService.readUserByUuid - User doesnt exist on database');
                console.log(error);
                throw error;
            }

            return mapRoleUserFromDbToRoleUser(userFromDb);
        } catch(error) {
            console.log(error);
            throw new Error('[myfarmer] AuthenticationDatabseService.readUserByUuid - Error reading user from database: ' + error);
        }
    }

    static async readUserByUserAccountUuid(uuidUserAccount: string): Promise<RoleUser> {
        console.log('START: AuthenticationDatabseService.readUserByUserAccountUuid: ' + uuidUserAccount);
        if (!uuidUserAccount) throw new Error('[myfarmer] AuthenticationDatabseService.readUserByUserAccountUuid - Wrong parameters');

        const query = `SELECT RoleUser.uuidRole,
                              RoleUser.uuidAvatar,
                              RoleUser.uuidUserAccount,
                              Role.uuid uuidOfRole,
                              Role.uuidPartner uuidPartnerOfRole,
                              Role.uuidAddress uuidAddressOfRole,
                              Partner.uuid uuidOfPartner,
                              Partner.companyName companyNameOfPartner,
                              Partner.firstName firstNameOfPartner,
                              Partner.lastName lastNameOfPartner,
                              Partner.nickname nicknameOfPartner,
                              Partner.companyName companyNameOfPartner,
                              Partner.birthdate birthdateOfPartner,
                              Partner.genderCode genderCodeOfPartner,
                              Partner.languageCode languageCodeOfPartner,
                              Address.uuid uuidOfAddress,
                              Address.street streetOfAddress,
                              Address.streetNumber streetNumberOfAddress,
                              Address.city cityOfAddress,
                              Address.postalCode postalCodeOfAddress,
                              Address.countryCode countryCodeOfAddress,
                              UserAccount.uuid uuidOfUserAccount,
                              UserAccount.userName userNameOfUserAccount
                            FROM RoleUser
                            LEFT JOIN Role ON RoleUser.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            LEFT JOIN UserAccount ON RoleUser.uuidUserAccount=UserAccount.uuid
                            WHERE UserAccount.uuid='${uuidUserAccount}';`;

        try {
            const userFromDb = await databaseConnectionPool.query(query);

            console.log('userFromDb: ' + JSON.stringify(userFromDb));
            if (userFromDb === null || userFromDb === undefined || userFromDb.length === 0) {
                const error = new Error('[myfarmer] AuthenticationDatabseService.readUserByUserAccountUuid - User doesnt exist on database');
                console.log(error);
                throw error;
            }

            return mapRoleUserFromDbToRoleUser(userFromDb);;
        } catch(error) {
            console.log(error);
            throw new Error('[myfarmer] AuthenticationDatabseService.readUser - Error reading user from database: ' + error);
        }
    }
}
