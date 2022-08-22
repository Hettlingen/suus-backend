import {Role} from "./role";
import {UserAccount} from "../../../authentication/model/user-account";
import {UserSettings} from "../user-settings";
import {NewsletterOrder} from "../../../../content-management-system/newsletter/model/newsletter-order";
import {RoleType} from "./role-type";
import {ShoppingCart} from "../../../../shop/model/order/shopping-cart";

export class RoleUser extends Role {

    public uuidAvatar!: string;
    public userAccount!: UserAccount;
    public userSettings!: UserSettings;
    public newsletterOrder!: NewsletterOrder;
    public shoppingCart!: ShoppingCart;

    constructor() {
        super();
        this.type = RoleType.ROLE_USER;
    }
}
