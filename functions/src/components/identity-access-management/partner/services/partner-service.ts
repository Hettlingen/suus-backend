import {PartnerDatabseService} from "./database/partner-databse-service";
import {RoleUser} from "../model/roles/role-user";
import {Partner} from "../model/partner";
import * as uuidGenerator from "uuid/v4";

export class PartnerService {

    // PERSON ---------------------------------------------
    static async createPerson(person: Partner): Promise<Partner> {
        console.log('START: PartnerService.addPerson: ' + person);
        person.uuid = uuidGenerator();

        try {
            return await PartnerDatabseService.createPerson(person);
        } catch(error){
            throw new Error('[myfarmer] PartnerService.createPerson - Error creating person: '
                + person.uuid + ', error: '
                + error);
        }
    }

    // FRIENDS ---------------------------------------------
    static async getFriends(uuidUserAccount: string): Promise<Array<RoleUser>> {
        console.log('START: PartnerService.getFriends: ' + JSON.stringify(uuidUserAccount));

        try {
            return await PartnerDatabseService.readFriends(uuidUserAccount);
        } catch(error){
            throw new Error('[myfarmer] PartnerService.getFriends - Error reading friends of user: ' + uuidUserAccount);
        }
    }

    static async addFriend(uuidPerson: string): Promise<RoleUser> {
        console.log('START: PartnerService.addFriend: ' + uuidPerson);

        try {
            return await PartnerDatabseService.createFriend(uuidPerson);
        } catch(error){
            throw new Error('[myfarmer] PartnerService.addFriend - Error creating Post for Blog: '
                + uuidPerson + ', error: '
                + error);
        }
    }

    static async removeFriend(uuidPerson: string): Promise<boolean> {
        console.log('START: PartnerService.removeFriend: ' + uuidPerson);

        try {
            return await PartnerDatabseService.deleteFriend(uuidPerson);
        } catch(error){
            throw new Error('[myfarmer] PartnerService.removeFriend - Error deleting Post: '
                + uuidPerson + ', error: '
                + error);
        }
    }
}
