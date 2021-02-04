import {RoleUser} from "../../model/roles/role-user";
import {Partner} from "../../model/partner";

export class PartnerDatabseService {

    static async createPerson(person: Partner): Promise<Partner> {
        return new Partner();
    }

    static async readFriends(uuidUserAccount: string): Promise<Array<RoleUser>> {
        return [];
    }

    static async createFriend(uuidPerson: string): Promise<RoleUser> {
        return new RoleUser();
    }

    static async deleteFriend(uuidPerson: string): Promise<boolean> {
        return false;
    }

    static async readFollowers(uuidRoleUser: string): Promise<Array<RoleUser>> {
        return [];
    }

    static async createFollower(uuidRoleUser: string): Promise<RoleUser> {
        return new RoleUser();
    }

    static async deleteFollower(uuidRoleUser: string): Promise<boolean> {
        return false;
    }

    static async readPeopleIFollow(uuidRoleUser: string): Promise<Array<RoleUser>> {
        return [];
    }

    static async createPersonIFollow(uuidRoleUser: string): Promise<RoleUser> {
        return new RoleUser();
    }

    static async deletePersonIFollow(uuidRoleUser: string): Promise<boolean> {
        return false;
    }
}
