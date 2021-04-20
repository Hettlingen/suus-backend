import {Role} from "./role";
import {UserAccount} from "../../../authentication/model/user-account";
import {UserSettings} from "../user-settings";
import {NewsletterOrder} from "../../../../content-management-system/newsletter/model/newsletter-order";

export class RoleUser extends Role {

    public uuidAvatar!: string;
    public userAccount!: UserAccount;
    public userSettings!: UserSettings;
    public newsletterOrder!: NewsletterOrder;
}
