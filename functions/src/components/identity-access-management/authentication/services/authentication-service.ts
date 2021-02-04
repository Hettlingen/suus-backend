import * as fs from 'fs';
import {UserAccount} from '../model/user-account';
import * as uuidGenerator from 'uuid/v4';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {AuthenticationDatabseService} from "./database/authentication-databse-service";
import {AuthenticationToken} from "../model/authenticationToken";
import {Partner} from "../../partner/model/partner";
import {RoleUser} from "../../partner/model/roles/role-user";
import {UserSettings} from "../../partner/model/user-settings";
import {Address} from "../../partner/model/address";
import {RoleCustomer} from "../../partner/model/roles/role-customer";
import {RoleProducer} from "../../partner/model/roles/role-producer";
import {RoleDeliverer} from "../../partner/model/roles/role-deliverer";
import {RoleType} from "../../partner/model/roles/role-type";
import {GenderCode} from "../../partner/model/gender-code";
import {RoleAdministrator} from "../../partner/model/roles/role-administrator";


export class AuthenticationService {

    private static RSA_PRIVATE_KEY = fs.readFileSync('src/utils/authentication/private.key');

    public static async login(userName: string, password: string): Promise<Partner> {
        // because in the jwt token the value is milliseconds or you can use "2 days", "10h", "7d"
        const jwtExpiresIn = '1h';

        // check user name
        // TODO use this methode validateEmailAndPassword instead of reading the user
        const userAccount = await AuthenticationDatabseService.readUserAccountByUserName(userName);

        if (userAccount === null || userAccount === undefined || userName !== userAccount.userName) {
            console.log('[AuthenticationService] Bad Username or Password');
            throw new Error('[AuthenticationService] Bad Username or Password');
        }

        // check password
        const match = await bcrypt.compare(password, userAccount.password);

        if (!match) {
            console.log('[AuthenticationService] Bad Username or Password');
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
        userAccount.password = '';

        // TODO we have to read partner, roles, address from the database
        const person: Partner = new Partner();
        person.lastName = 'Braun';
        person.firstName = 'Martin';
        person.birthdate = new Date();
        person.genderCode = GenderCode.MALE;

        const address: Address = new Address();
        address.street = 'Lärchenstrasse';
        address.streetNumber = '10';
        address.postalCode = '8442';
        address.city = 'Hettlingen';
        address.countryCode = 'CH';

        const roleUser: RoleUser = new RoleUser();
        roleUser.type = RoleType.ROLE_USER;
        roleUser.userAccount = userAccount;
        roleUser.userSettings = new UserSettings();
        roleUser.userSettings.languageApplicationCode = 'de';
        roleUser.userSettings.notificationsYesNo = 1;
        roleUser.address = address;
        person.listRole.push(roleUser);

        const roleCustomer: RoleCustomer = new RoleCustomer();
        roleCustomer.type = RoleType.ROLE_CUSTOMER;
        roleCustomer.numberCustomer = 111;
        roleCustomer.address = address;
        person.listRole.push(roleCustomer);

        const roleProducer: RoleProducer = new RoleProducer();
        roleProducer.type = RoleType.ROLE_PRODUCER;
        roleProducer.numberCompany = 222;
        roleProducer.address = address;
        person.listRole.push(roleProducer);

        const roleDeliverer: RoleDeliverer = new RoleDeliverer();
        roleDeliverer.type = RoleType.ROLE_DELIVERER;
        roleDeliverer.numberCompany = 333;
        roleDeliverer.address = address;
        person.listRole.push(roleDeliverer);

        const roleAdministrator: RoleAdministrator = new RoleAdministrator();
        roleAdministrator.type = RoleType.ROLE_ADMINISTRATOR;
        roleAdministrator.address = address;
        person.listRole.push(roleAdministrator);

        return person;
    };

    public static async register(userAccount: UserAccount): Promise<UserAccount> {
        if (await this.isUserAccountExisting(userAccount.userName)) {
            console.info('[myfarmer] AuthenticationService.register - UserAccount is already existing');
            throw new Error('[myfarmer] AuthenticationService.register - UserAccount is already existing');
        }

        userAccount.uuid = uuidGenerator();
        userAccount.hashedPassword = await bcrypt.hash(userAccount.password, 10);

        try {
            return AuthenticationDatabseService.createUserAccount(userAccount);
        } catch (error) {
            console.log('[myfarmer] AuthenticationService.register - Error create new user-account: ' + error);
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

        let token = '';
        // Express headers are auto converted to lowercase
        const bearerToken = request.headers['authorization'];

        if (bearerToken === null || bearerToken === undefined) {
            console.log('[myfarmer] Missing authorization header');
            return request.status(401).json({ message: '[myfarmer] Missing authorization header' });
        }

        if (bearerToken.startsWith('Bearer')) {
            // Remove Bearer from string
            token = bearerToken.slice(7, bearerToken.length);
        }

        if (!token) {
            return request.status(401).json({ message: '[myfarmer] Missing authorization header' });
        }

        jwt.verify(token, RSA_PUBLIC_KEY, { algorithms: ['RS256']}, (err, payload) => {
            if (err) {
                console.error('[myfarmer] Couldnt verify the authorization header');
                response.status(401).json({ message: '[myfarmer] Couldnt verify the authorization header' });
            }

            // if the JWT is valid, allow them to go to the intended endpoint
            return next();
        });
    };
}
