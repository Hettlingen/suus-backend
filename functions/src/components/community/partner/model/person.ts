import {Role} from "./roles/role";

export class Person {
  public uuid!: string;
  public lastName!: string;
  public firstName!: string;
  public age!: number;
  public genderCode!: number;
  public listRole: Array<Role> = [];
}
