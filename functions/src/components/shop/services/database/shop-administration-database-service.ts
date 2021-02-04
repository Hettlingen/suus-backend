import {RoleProducer} from "../../../identity-access-management/partner/model/roles/role-producer";
import {database} from "../../../../index";
import {mapProducerFromDbToProducer} from "../../mapper/shop-administration-mapper";

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
}
