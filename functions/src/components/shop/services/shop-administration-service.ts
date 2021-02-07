import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";
import {ShopAdministrationDatabaseService} from "./database/shop-administration-database-service";
import {FileService} from "../../workplace/services/file-service";
import {RoleType} from "../../identity-access-management/partner/model/roles/role-type";
import {RoleDeliverer} from "../../identity-access-management/partner/model/roles/role-deliverer";

export class ShopAdministrationService {

    static async getProducer(uuidRoleProducer: string): Promise<RoleProducer> {
        console.log('START: ShopAdministrationService.getProducer: ' + uuidRoleProducer);
        if (!uuidRoleProducer) throw new Error('[myfarmer] UUID of producer is required');

        try {
            const roleProducer = await ShopAdministrationDatabaseService.readProducer(uuidRoleProducer);
            FileService.readImageOfRole(roleProducer.fileLogo.uuid, RoleType.ROLE_PRODUCER)
                .then(myFile => roleProducer.fileLogo = myFile)
                .catch(error => console.log(error));
            // FileService.readImageOfRole(roleProducer.fileBackground.uuid, RoleType.ROLE_PRODUCER)
            //     .then(myFile => roleProducer.fileBackground = myFile)
            //     .catch(error => console.log(error));
            return roleProducer;
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.getProducer - Error reading Producer');
        }
    }

    static async updateProducer(roleProducer: RoleProducer): Promise<RoleProducer> {
        console.log('START: ShopAdministrationService.updateProducer: ' + roleProducer.numberCompany);

        try {
            return await ShopAdministrationDatabaseService.updateProducer(roleProducer);
        } catch(error){
            throw new Error('[myfarmer] ShopAdministrationService.updateProducer - Error reading Producer');
        }
    }

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
