import {Role} from './role';
import {MyFile} from "../../../../workplace/model/my-file";

export class RoleProducer extends Role {

    public numberCompany!: number;
    public description!: string;
    public fileLogo!: MyFile;
    public fileBackground!: MyFile;
}
