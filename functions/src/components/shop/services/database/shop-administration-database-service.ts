import {RoleProducer} from "../../../identity-access-management/partner/model/roles/role-producer";
import {database} from "../../../../index";
import {mapDelivererFromDbToDeliverer, mapProducerFromDbToProducer} from "../../mapper/shop-administration-mapper";
import {RoleDeliverer} from "../../../identity-access-management/partner/model/roles/role-deliverer";

export class ShopAdministrationDatabaseService {

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

            console.log('producerFromDb: ' + JSON.stringify(producerFromDb));
            if (producerFromDb === null || producerFromDb === undefined || producerFromDb.length === 0) {
                const error = new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Producer doesnt exist on database');
                console.log(error);
                throw error;
            }

            return mapProducerFromDbToProducer(producerFromDb);;
        } catch(error) {
            console.log(error);
            throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Error reading Producer from database: ' + error);
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
                            FROM RoleProducer
                            LEFT JOIN Role ON RoleProducer.uuidRole=Role.uuid
                            LEFT JOIN Partner ON Role.uuidPartner=Partner.uuid
                            LEFT JOIN Address ON Role.uuidAddress=Address.uuid
                            WHERE RoleProducer.uuidRole='${uuidRoleDeliverer}';`;

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
