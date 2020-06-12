import {Partner} from './partner';

export class Person extends Partner {
  public lastName: string;
  public firstName: string;
  public age!: number;


  constructor(uuid: string, firstName: string, lastName: string) {
    super(uuid);
    this.lastName = lastName;
    this.firstName = firstName;
  }
}
