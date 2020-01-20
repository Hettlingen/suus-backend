export class UserAccount {
    public uuid!: string;
    public userName!: string;
    public password!: string;
    public email!: string;
    public state!: number;
    public amountOfLogonAttempts: number = 0;
    public dateCreated!: Date;
    public dateUpdatedAt!: Date;
}