import {ShopAdministrationDatabaseService} from "./database/shop-administration-database-service";
import {RoleCustomer} from "../../identity-access-management/partner/model/roles/role-customer";

export class ShopCustomerService {

    static async getCustomer(uuidRoleCustomer: string): Promise<RoleCustomer> {
        console.log('START: ShopAdministrationService.getCustomer: ' + uuidRoleCustomer);
        if (!uuidRoleCustomer) throw new Error('[myfarmer] UUID of customer is required');

        try {
            return await ShopAdministrationDatabaseService.readCustomer(uuidRoleCustomer);
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.getCustomer - Error reading customer');
        }
    }

    static async updateCustomer(roleCustomer: RoleCustomer): Promise<RoleCustomer> {
        console.log('START: ShopAdministrationService.updateCustomer: ' + roleCustomer.numberCustomer);

        try {
            return await ShopAdministrationDatabaseService.updateCustomer(roleCustomer);
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.updateCustomer - Error updating customer');
        }
    }
}
