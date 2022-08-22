import {UserAccount} from "../../model/user-account";
import {database} from "../../../../../index";
import {RoleUser} from "../../../partner/model/roles/role-user";
import {mapRoleUserFromDbToRoleUser} from "../../mapper/authentication-mapper";
import {promisify} from 'util';

export class AuthenticationDatabseService {

    /**
     * See: https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
     */
    static async createUserAccount(userAccount: UserAccount): Promise<UserAccount> {
        console.info('AuthenticationDatabseService.createUserAccount] START');
        const rollback = promisify(database.rollback).bind(database);
        const commit = promisify(database.commit).bind(database);
        const query = promisify(database.query).bind(database);
        console.info('INITIALIZE Promisify');

        try {
            // INSERT UserAccount
            console.info('INSERT UserAccount');
            const queryUserAccount = `INSERT INTO UserAccount(uuid, userName, password, email) VALUES ('${userAccount.uuid}', '${userAccount.userName}', '${userAccount.hashedPassword}', '${userAccount.email}')`;
            await query(queryUserAccount);

            // INSERT Role
            console.info('INSERT Role');
            const roleUser = userAccount.roleUser
            const queryRole = `INSERT INTO Role(uuid, type) VALUES ('${roleUser.uuid}', '${roleUser.type}')`;
            await query(queryRole);

            // INSERT RoleUser
            console.info('INSERT RoleUser');
            const queryRoleUser = `INSERT INTO RoleUser(uuidRole, uuidUserAccount) VALUES ('${roleUser.uuid}', '${userAccount.uuid}')`;
            await query(queryRoleUser);

            // INSERT Settings
            console.info('INSERT Settings');
            const settings = userAccount.roleUser.userSettings;
            const querySettings = `INSERT INTO SettingsUser(uuid, languageApplicationCode, notificationYesNo ) VALUES ('${settings.uuid}', '${settings.languageApplicationCode}', '${settings.notificationsYesNo}')`;
            await query(querySettings);

            // INSERT ShoppingCart
            console.info('INSERT ShoppingCart');
            const shoppingCart = userAccount.roleUser.shoppingCart;
            const queryShoppingCart = `INSERT INTO ShoppingCart(uuid, uuidRoleUser) VALUES ('${shoppingCart.uuid}', '${roleUser.uuid}')`;
            await query(queryShoppingCart);

            await commit();
        } catch ( error ) {
            console.error('[AuthenticationDatabseService.createUserAccount] Rollback register user-account for: ', userAccount.userName, error);
            await rollback();
        }

        // return this.readUserAccountByUuid(userAccount.uuid);
        return new UserAccount();
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
            const userFromDb = await database.query(query);

            console.log('userFromDb: ' + JSON.stringify(userFromDb));
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
            const userFromDb = await database.query(query);

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
