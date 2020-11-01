import {AuthenticationToken} from "./authenticationToken";

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
    public dateUpdatedAt!: Date;


    constructor(uuid: string, userName: string, password: string, email: string) {
        this.uuid = uuid;
        this.userName = userName;
        this.password = password;
        this.email = email;
    }
}
