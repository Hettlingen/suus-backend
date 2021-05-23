import {MyFile} from "../../workplace/model/my-file";
import {Partner} from "../../identity-access-management/partner/model/partner";
import {Address} from "../../identity-access-management/partner/model/address";
import {RoleDeliverer} from "../../identity-access-management/partner/model/roles/role-deliverer";
import {RoleCustomer} from "../../identity-access-management/partner/model/roles/role-customer";

export const mapCustomerFromDbToCustomer = (customerFromDb: any) => {
    const roleCustomer = new RoleCustomer();

    roleCustomer.uuid = customerFromDb[0].uuid;
    roleCustomer.numberCustomer = customerFromDb[0].numberCustomer;

    const address = new Address();
    address.uuid = customerFromDb[0].uuidOfAddress;
    address.street = customerFromDb[0].streetOfAddress;
    address.streetNumber = customerFromDb[0].streetNumberOfAddress;
    address.postalCode = customerFromDb[0].postalCodeOfAddress;
    address.city = customerFromDb[0].cityOfAddress;
    address.countryCode = customerFromDb[0].countryCodeOfAddress;
    roleCustomer.address = address;

    const partner = new Partner();
    partner.firstName = customerFromDb[0].firstNameOfPartner;
    partner.lastName = customerFromDb[0].lastNameOfPartner;
    partner.nickname = customerFromDb[0].nicknameOfPartner;
    partner.companyName = customerFromDb[0].companyNameOfPartner;
    partner.birthdate = customerFromDb[0].birthdateOfPartner;
    partner.genderCode = customerFromDb[0].genderCodeOfPartner;
    partner.languageCode = customerFromDb[0].languageCodeOfPartner;
    roleCustomer.partner = partner;

    return roleCustomer;
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
