import {Shop} from "../model/shop";
import {ShopDatabaseService} from "./database/shop-database-service";

export class ShopService {

    static async getShop(uuidShop: string): Promise<Shop> {
        console.log('START: ShopService.getShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        try {
            return await ShopDatabaseService.readShop(uuidShop);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getShop - Error reading Shop');
        }
    }
}