import {AuthenticationToken} from "./authenticationToken";
import {RoleUser} from "../../partner/model/roles/role-user";

export class UserAccount {
    public uuid!: string;
    public userName!: string;
    public password!: string;
    public hashedPassword!: string;
    public email!: string;
    public state!: number;
    public authenticationToken: AuthenticationToken = new AuthenticationToken();
    public amountOfLogonAttempts: number = 0;
    public dateCreated!: Date;
    public dateUpdated!: Date;

    public roleUser!: RoleUser;
}
