import {Role} from "./roles/role";

export class Partner {
  public uuid!: string;
  public lastName!: string;
  public firstName!: string;
  public nickname!: string;
  public companyName!: string;
  public birthdate!: Date;
  public genderCode!: number;
  public languageCode!: string;

  public listRole: Array<Role> = [];
}
