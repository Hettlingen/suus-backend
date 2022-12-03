import {UserAccount} from "../../functions/src/components/identity-access-management/authentication/model/user-account";


const userAccount = new UserAccount();
userAccount.uuid = '';
userAccount.userName = 'Martin';
userAccount.password = 'blabla';
userAccount.email = 'm.b@s.ch';

export const USER_ACCOUNT: UserAccount = userAccount;
