import {RoleProducer} from "../../../identity-access-management/partner/model/roles/role-producer";
import {database} from "../../../../index";
import {mapCustomerFromDbToCustomer, mapDelivererFromDbToDeliverer} from "../../mapper/shop-administration-mapper";
import {RoleDeliverer} from "../../../identity-access-management/partner/model/roles/role-deliverer";
import {RoleCustomer} from "../../../identity-access-management/partner/model/roles/role-customer";
import {ShopProducerMapper} from "../../mapper/shop-producer-mapper";

export class ShopAdministrationDatabaseService {

    static async readCustomer(uuidRoleCustomer: string): Promise<RoleCustomer> {
        console.log('START: ShopAdministrationDatabaseService.readCustomer: ' + uuidRoleCustomer);
        if (!uuidRoleCustomer) throw new Error('[myfarmer] ShopAdministrationDatabaseService.readCustomer - Wrong parameters');

        const query = `SELECT RoleCustomer.uuidRole,
                              RoleCustomer.numberCustomer
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
                              Address.countryCode countryCodeOfAddress
                            FROM RoleCustomer
                            LEFT JOIN Role ON RoleCustomer.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            WHERE RoleCustomer.uuidRole='${uuidRoleCustomer}';`;

        try {
            const customerFromDb = await database.query(query);

            console.log('customerFromDb: ' + JSON.stringify(customerFromDb));
            if (customerFromDb === null || customerFromDb === undefined || customerFromDb.length === 0) {
                const error = new Error('[myfarmer] ShopAdministrationDatabaseService.readCustomer - Customer doesnt exist on database');
                console.log(error);
                throw error;
            }

            return mapCustomerFromDbToCustomer(customerFromDb);;
        } catch(error) {
            console.log(error);
            throw new Error('[myfarmer] ShopAdministrationDatabaseService.readCustomer - Error reading customer from database: ' + error);
        }
    }

    static async updateCustomer(roleCustomer: RoleCustomer): Promise<RoleCustomer> {
        return new RoleCustomer();
    }

    static async readProducer(uuidRoleProducer: string): Promise<RoleProducer> {
        console.log('START: ShopAdministrationDatabaseService.readProducer: ' + uuidRoleProducer);
        if (!uuidRoleProducer) throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Wrong parameters');

        const query = `SELECT RoleProducer.uuidRole,
                              RoleProducer.numberCompany,
                              RoleProducer.description,
                              RoleProducer.uuidImageLogo,
                              RoleProducer.uuidImageBackground,
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
                              Address.countryCode countryCodeOfAddress
                            FROM RoleProducer
                            LEFT JOIN Role ON RoleProducer.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            WHERE RoleProducer.uuidRole='${uuidRoleProducer}';`;

        try {
            const producerFromDb = await database.query(query);

            if (producerFromDb === null || producerFromDb === undefined || producerFromDb.length === 0) {
                const error = new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Producer doesnt exist on database');
                console.log(error);
                throw error;
            }

            return ShopProducerMapper.mapProducerFromDbToProducer(producerFromDb);;
        } catch(error) {
            console.log(error);
            throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Error reading Producer from database: ' + error);
        }
    }

    static async readProducers(): Promise<RoleProducer[]> {
        console.log('START: ShopAdministrationDatabaseService.readProducers');

        const query = `SELECT RoleProducer.uuidRole,
                              RoleProducer.numberCompany,
                              RoleProducer.description,
                              RoleProducer.uuidImageLogo,
                              RoleProducer.uuidImageBackground,
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
                              Address.countryCode countryCodeOfAddress
                            FROM RoleProducer
                            LEFT JOIN Role ON RoleProducer.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid;`;

        try {
            const producersFromDb = await database.query(query);

            console.log('allProducersFromDb: ' + JSON.stringify(producersFromDb));
            if (producersFromDb === null || producersFromDb === undefined || producersFromDb.length === 0) {
                const error = new Error('[myfarmer] ShopAdministrationDatabaseService.readProducers - Producers doesnt exist on database');
                console.log(error);
                throw error;
            }

            return ShopProducerMapper.mapProducersFromDbToProducers(producersFromDb);
        } catch(error) {
            console.log(error);
            throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducers - Error reading all Producers from database: ' + error);
        }
    }

    static async updateProducer(roleProducer: RoleProducer): Promise<RoleProducer> {
        return new RoleProducer();
    }

    static async readDeliverer(uuidRoleDeliverer: string): Promise<RoleProducer> {
        console.log('START: ShopAdministrationDatabaseService.readDeliverer: ' + uuidRoleDeliverer);
        if (!uuidRoleDeliverer) throw new Error('[myfarmer] ShopAdministrationDatabaseService.readDeliverer - Wrong parameters');

        const query = `SELECT RoleDeliverer.uuidRole,
                              RoleDeliverer.numberCompany,
                              RoleDeliverer.description,
                              RoleDeliverer.uuidImageLogo,
                              RoleDeliverer.uuidImageBackground,
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
                              Address.countryCode countryCodeOfAddress
                            FROM RoleDeliverer
                            LEFT JOIN Role ON RoleDeliverer.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            WHERE RoleDeliverer.uuidRole='${uuidRoleDeliverer}';`;

        try {
            const delivererFromDb = await database.query(query);

            console.log('delivererFromDb: ' + JSON.stringify(delivererFromDb));
            if (delivererFromDb === null || delivererFromDb === undefined || delivererFromDb.length === 0) {
                const error = new Error('[myfarmer] ShopAdministrationDatabaseService.readDeliverer - Deliverer doesnt exist on database');
                throw error;
            }

            return mapDelivererFromDbToDeliverer(delivererFromDb);;
        } catch(error) {
            throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Error reading Producer from database: ' + error);
        }
    }

    static async updateDeliverer(roleProducer: RoleDeliverer): Promise<RoleDeliverer> {
        return new RoleDeliverer();
    }
}
