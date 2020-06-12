import {Role} from './roles/role';

export class Partner {

  public uuid: string;
  public listRole!: Role;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}
