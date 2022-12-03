import {ShopAdministrationDatabaseService} from "./database/shop-administration-database-service";
import {FileService} from "../../workplace/services/utils/file-service";
import {RoleType} from "../../identity-access-management/partner/model/roles/role-type";
import {RoleDeliverer} from "../../identity-access-management/partner/model/roles/role-deliverer";

export class ShopDelivererService {

    static async getDeliverer(uuidRoleDeliverer: string): Promise<RoleDeliverer> {
        console.log('START: ShopAdministrationService.getDeliverer: ' + uuidRoleDeliverer);
        if (!uuidRoleDeliverer) throw new Error('[myfarmer] UUID of deliverer is required');

        try {
            const roleDeliverer = await ShopAdministrationDatabaseService.readDeliverer(uuidRoleDeliverer);
            FileService.readImageOfRole(roleDeliverer.fileLogo.uuid, RoleType.ROLE_DELIVERER)
                .then(myFile => roleDeliverer.fileLogo = myFile)
                .catch(error => console.log(error));
            // FileService.readImageOfRole(roleProducer.fileBackground.uuid, RoleType.ROLE_DELIVERER)
            //     .then(myFile => roleProducer.fileBackground = myFile)
            //     .catch(error => console.log(error));
            return roleDeliverer;
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.getDeliverer - Error reading Deliverer');
        }
    }

    static async updateDeliverer(roleDeliverer: RoleDeliverer): Promise<RoleDeliverer> {
        console.log('START: ShopAdministrationService.updateDeliverer: ' + roleDeliverer.numberCompany);

        try {
            return await ShopAdministrationDatabaseService.updateDeliverer(roleDeliverer);
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.updateDeliverer - Error reading Deliverer');
        }
    }
}
