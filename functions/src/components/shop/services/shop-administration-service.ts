import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";
import {ShopAdministrationDatabaseService} from "./database/shop-administration-database-service";

export class ShopAdministrationService {

    static async getProducer(uuidRoleProducer: string): Promise<RoleProducer> {
        console.log('START: ShopAdministrationService.getProducer: ' + uuidRoleProducer);
        if (!uuidRoleProducer) throw new Error('[myfarmer] UUID of producer is required');

        try {
            return await ShopAdministrationDatabaseService.readProducer(uuidRoleProducer);
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.getProducer - Error reading Producer');
        }
    }

    static async updateProducer(roleProducer: RoleProducer): Promise<RoleProducer> {
        console.log('START: ShopAdministrationService.updateProducer: ' + roleProducer.numberProducer);

        try {
            return await ShopAdministrationDatabaseService.updateProducer(roleProducer);
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.getShop - Error reading Shop');
        }
    }
}
