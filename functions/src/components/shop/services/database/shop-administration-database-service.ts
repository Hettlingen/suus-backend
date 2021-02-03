import {RoleProducer} from "../../../identity-access-management/partner/model/roles/role-producer";
import {database} from "../../../../index";
import {mapProducerFromDbToProducer} from "../../mapper/shop-administration-mapper";

export class ShopAdministrationDatabaseService {

    static async readProducer(uuidRoleProducer: string): Promise<RoleProducer> {
        console.log('START: ShopAdministrationDatabaseService.readProducer: ' + uuidRoleProducer);
        if (!uuidRoleProducer) throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Wrong parameters');

        const query = `SELECT RoleProducer.uuid, RoleProducer.numberProducer, RoleProducer.description, RoleProducer.uuidImageLogo, RoleProducer.uuidImageBackground,
                              Role.uuid uuidOfRole, 
                              Role.uuidPartner uuidPartnerOfRole, 
                              Role.uuidAddress uuidAddressOfRole,
                              Partner.uuid uuidOfPartner,
                              Partner.nameCompany nameCompanyOfPartner,
                              Partner.firstName firstNameOfPartner,
                              Partner.lastName lastNameOfPartner,
                              Partner.nickname nicknameOfPartner,
                              Partner.birthdate birthdateOfPartner,
                              Partner.genderCode genderCodeOfPartner,
                              Partner.type typeOfPartner,
                              Address.uuid uuidOfAddress,
                              Address.street streetOfAddress,
                              Address.streetNumber streetNumberOfAddress,
                              Address.city cityOfAddress,
                              Address.postalCode postalCodeOfAddress,
                              Address.countryCode countryCodeOfAddress,
                            FROM RoleProducer 
                            LEFT JOIN Role 
                                ON RoleProducer.uuidRole=Role.uuid
                            WHERE RoleProducer.uuid='${uuidRoleProducer}';`;

        try {
            const producerFromDb = await database.query(query);

            if (producerFromDb === null || producerFromDb === undefined || producerFromDb.length === 0) {
                throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Producer doesnt exist on database');
            }

            return mapProducerFromDbToProducer(producerFromDb);;
        } catch(error) {
            throw new Error('[myfarmer] ShopAdministrationDatabaseService.readProducer - Error reading Producer from database: ' + error);
        }
    }

    static async updateProducer(roleProducer: RoleProducer): Promise<RoleProducer> {
        return new RoleProducer();
    }
}
