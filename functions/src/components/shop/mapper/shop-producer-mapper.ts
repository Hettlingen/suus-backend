import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";
import {MyFile} from "../../workplace/model/my-file";
import {Address} from "../../identity-access-management/partner/model/address";
import {Partner} from "../../identity-access-management/partner/model/partner";

export class ShopProducerMapper {

    static async mapProducerFromDbToProducer(producerFromDb: any): Promise<RoleProducer> {
        const roleProducer = new RoleProducer();

        roleProducer.uuid = producerFromDb[0].uuid;
        roleProducer.numberCompany = producerFromDb[0].numberCompany;
        roleProducer.description = producerFromDb[0].description;
        const fileLogo = new MyFile();
        fileLogo.uuid = producerFromDb[0].uuidImageLogo;
        roleProducer.fileLogo = fileLogo;
        const fileBackground = new MyFile();
        fileBackground.uuid = producerFromDb[0].uuidImageBackground;
        roleProducer.fileBackground = fileBackground;

        const address = new Address();
        address.uuid = producerFromDb[0].uuidOfAddress;
        address.street = producerFromDb[0].streetOfAddress;
        address.streetNumber = producerFromDb[0].streetNumberOfAddress;
        address.postalCode = producerFromDb[0].postalCodeOfAddress;
        address.city = producerFromDb[0].cityOfAddress;
        address.countryCode = producerFromDb[0].countryCodeOfAddress;
        roleProducer.address = address;

        const partner = new Partner();
        partner.firstName = producerFromDb[0].firstNameOfPartner;
        partner.lastName = producerFromDb[0].lastNameOfPartner;
        partner.nickname = producerFromDb[0].nicknameOfPartner;
        partner.companyName = producerFromDb[0].companyNameOfPartner;
        partner.birthdate = producerFromDb[0].birthdateOfPartner;
        partner.genderCode = producerFromDb[0].genderCodeOfPartner;
        partner.languageCode = producerFromDb[0].languageCodeOfPartner;
        roleProducer.partner = partner;

        return roleProducer;
    }

    static async mapProducersFromDbToProducers(producersFromDb: any): Promise<RoleProducer[]> {
        const listRoleProducers = [];
        console.log('Start mapping producers');
        for (const producerFromDb of producersFromDb) {
            const roleProducer = new RoleProducer();
            roleProducer.uuid = producerFromDb.uuid;
            roleProducer.numberCompany = producerFromDb.numberCompany;
            roleProducer.description = producerFromDb.description;
            const fileLogo = new MyFile();
            fileLogo.uuid = producerFromDb.uuidImageLogo;
            roleProducer.fileLogo = fileLogo;
            const fileBackground = new MyFile();
            fileBackground.uuid = producerFromDb.uuidImageBackground;
            roleProducer.fileBackground = fileBackground;

            const address = new Address();
            address.uuid = producerFromDb.uuidOfAddress;
            address.street = producerFromDb.streetOfAddress;
            address.streetNumber = producerFromDb.streetNumberOfAddress;
            address.postalCode = producerFromDb.postalCodeOfAddress;
            address.city = producerFromDb.cityOfAddress;
            address.countryCode = producerFromDb.countryCodeOfAddress;
            roleProducer.address = address;

            const partner = new Partner();
            partner.firstName = producerFromDb.firstNameOfPartner;
            partner.companyName = producerFromDb.companyNameOfPartner;
            partner.birthdate = producerFromDb.birthdateOfPartner;
            partner.genderCode = producerFromDb.genderCodeOfPartner;
            partner.languageCode = producerFromDb.languageCodeOfPartner;
            roleProducer.partner = partner;

            listRoleProducers.push(roleProducer);
        }

        return listRoleProducers;
    }
}
