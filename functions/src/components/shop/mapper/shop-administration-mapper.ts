import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";
import {MyFile} from "../../workplace/model/my-file";
import {Partner} from "../../identity-access-management/partner/model/partner";
import {Address} from "../../identity-access-management/partner/model/address";

export const mapProducerFromDbToProducer = (producerFromDb: any) => {
    const roleProducer = new RoleProducer();

    roleProducer.uuid = producerFromDb[0].uuid;
    roleProducer.numberCompany = producerFromDb[0].numberCompany;
    roleProducer.description = producerFromDb[0].description;
    roleProducer.fileLogo = new MyFile();
    roleProducer.fileBackground = new MyFile();

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
