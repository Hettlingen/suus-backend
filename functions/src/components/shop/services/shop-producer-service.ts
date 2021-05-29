import {RoleProducer} from "../../identity-access-management/partner/model/roles/role-producer";
import {ShopAdministrationDatabaseService} from "./database/shop-administration-database-service";
import {FileService} from "../../workplace/services/file-service";
import {RoleType} from "../../identity-access-management/partner/model/roles/role-type";

export class ShopProducerService {

    static async getProducer(uuidRoleProducer: string): Promise<RoleProducer> {
        console.log('START: ShopProducerService.getProducer: ' + uuidRoleProducer);
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
            throw new Error('[myfarmer] ShopProducerService.getProducer - Error reading producer');
        }
    }

    static async updateProducer(roleProducer: RoleProducer): Promise<RoleProducer> {
        console.log('START: ShopProducerService.updateProducer: ' + roleProducer.numberCompany);

        try {
            return await ShopAdministrationDatabaseService.updateProducer(roleProducer);
        } catch(error){
            throw new Error('[myfarmer] ShopProducerService.updateProducer - Error updating producer');
        }
    }

    static async getProducersWithinArea(latitudeOfUserLocation: number, longitudeOfUserLocation: number, radiusOfProducerInKm: number): Promise<RoleProducer[]> {
        console.log('START: ShopProducerService.getProducersWithinArea');
        let listRoleProducers: RoleProducer[];

        try {
            listRoleProducers = await ShopAdministrationDatabaseService.readProducers();
            // todo at the moment we calculate this in the frontend
            // listRoleProducers = await LocationService.getAllProducersWithinRadius(listRoleProducers, latitudeOfUserLocation, longitudeOfUserLocation, 20);
        } catch(error){
            throw new Error('[myfarmer] ShopProducerService.getProducersWithinArea - Error reading all producer');
        }

        return listRoleProducers;
    }
}
