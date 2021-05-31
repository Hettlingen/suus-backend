import {Address} from "../../partner/model/address";
import {RoleUser} from "../../partner/model/roles/role-user";
import {Partner} from "../../partner/model/partner";
import {UserAccount} from "../model/user-account";

export const mapUserFromDbToUser = (userFromDb: any) => {
    const roleUser = new RoleUser();

    roleUser.uuid = userFromDb[0].uuidRole;
    roleUser.uuidAvatar = userFromDb[0].uuidAvatar;

    const userAccount = new UserAccount();
    userAccount.uuid = userFromDb[0].uuidOfUserAccount;
    userAccount.userName = userFromDb[0].userNameOfUserAccount;
    roleUser.userAccount = userAccount;

    const partner = new Partner();
    partner.firstName = userFromDb[0].firstNameOfPartner;
    partner.lastName = userFromDb[0].lastNameOfPartner;
    partner.nickname = userFromDb[0].nicknameOfPartner;
    partner.companyName = userFromDb[0].companyNameOfPartner;
    partner.birthdate = userFromDb[0].birthdateOfPartner;
    partner.genderCode = userFromDb[0].genderCodeOfPartner;
    partner.languageCode = userFromDb[0].languageCodeOfPartner;
    roleUser.partner = partner;

    const address = new Address();
    address.uuid = userFromDb[0].uuidOfAddress;
    address.street = userFromDb[0].streetOfAddress;
    address.streetNumber = userFromDb[0].streetNumberOfAddress;
    address.postalCode = userFromDb[0].postalCodeOfAddress;
    address.city = userFromDb[0].cityOfAddress;
    address.countryCode = userFromDb[0].countryCodeOfAddress;
    roleUser.address = address;

    return roleUser;
}
