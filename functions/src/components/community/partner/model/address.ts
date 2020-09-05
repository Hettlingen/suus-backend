import {Role} from "./roles/role";

export class Address {
    public uuid!: string;
    public street!: string;
    public streetNumber!: string;
    public city!: string;
    public postalCode!: string;
    public countryCode!: string;
    public role!: Role;
}
