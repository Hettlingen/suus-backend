import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";
import {MyFile} from "../../workplace/model/my-file";
import {Partner} from "../../identity-access-management/partner/model/partner";
import {Address} from "../../identity-access-management/partner/model/address";
import {RoleDeliverer} from "../../identity-access-management/partner/model/roles/role-deliverer";

export const mapProducerFromDbToProducer = (producerFromDb: any) => {
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

export const mapDelivererFromDbToDeliverer = (delivererFromDb: any) => {
    const roleDeliverer = new RoleDeliverer();

    roleDeliverer.uuid = delivererFromDb[0].uuid;
    roleDeliverer.numberCompany = delivererFromDb[0].numberCompany;
    roleDeliverer.description = delivererFromDb[0].description;
    const fileLogo = new MyFile();
    fileLogo.uuid = delivererFromDb[0].uuidImageLogo;
    roleDeliverer.fileLogo = fileLogo;
    const fileBackground = new MyFile();
    fileBackground.uuid = delivererFromDb[0].uuidImageBackground;
    roleDeliverer.fileBackground = fileBackground;

    const address = new Address();
    address.uuid = delivererFromDb[0].uuidOfAddress;
    address.street = delivererFromDb[0].streetOfAddress;
    address.streetNumber = delivererFromDb[0].streetNumberOfAddress;
    address.postalCode = delivererFromDb[0].postalCodeOfAddress;
    address.city = delivererFromDb[0].cityOfAddress;
    address.countryCode = delivererFromDb[0].countryCodeOfAddress;
    roleDeliverer.address = address;

    const partner = new Partner();
    partner.firstName = delivererFromDb[0].firstNameOfPartner;
    partner.lastName = delivererFromDb[0].lastNameOfPartner;
    partner.nickname = delivererFromDb[0].nicknameOfPartner;
    partner.companyName = delivererFromDb[0].companyNameOfPartner;
    partner.birthdate = delivererFromDb[0].birthdateOfPartner;
    partner.genderCode = delivererFromDb[0].genderCodeOfPartner;
    partner.languageCode = delivererFromDb[0].languageCodeOfPartner;
    roleDeliverer.partner = partner;

    return roleDeliverer;
}
