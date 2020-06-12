import {Country} from "./country";

export class Address {
    public street!: string;
    public streetNumber!: string;
    public postalCode!: string;
    public city!: string;
    public country!: Country;
}
