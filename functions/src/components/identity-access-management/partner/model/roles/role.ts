import {Address} from "../address";
import {RoleType} from "./role-type";
import {Partner} from "../partner";

export class Role {

    public uuid!: string;
    public address!: Address;
    public partner!: Partner;
    public type!: RoleType;
    public dateCreated!: Date;
}
