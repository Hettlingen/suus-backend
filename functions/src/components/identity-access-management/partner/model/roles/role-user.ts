import {Role} from "./role";
import {UserAccount} from "../../../authentication/model/user-account";
import {UserSettings} from "../user-settings";

export class RoleUser extends Role {

    public userAccount!: UserAccount;
    public userSettings!: UserSettings;
}
