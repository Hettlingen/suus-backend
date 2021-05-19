export class Address {
    public uuid!: string;
    public street!: string;
    public streetNumber!: string;
    public city!: string;
    public postalCode!: string;
    public countryCode!: string;
    public latitude!: number; // Breitengrad (horizontale Linien, nördlich <=> südlich)
    public longitude!: number; // Längengrad (senkrechte Linien, östlich <=> westlich)
}
