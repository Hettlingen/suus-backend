import {Shop} from "../model/shop";
import {ShopDatabaseService} from "./database/shop-database-service";
import {ShopItem} from "../model/shop-item";

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

    static async getShopItem(uuidShopItem: string): Promise<ShopItem> {
        console.log('START: ShopService.getShopItem: ' + uuidShopItem);
        if (!uuidShopItem) throw new Error('[myfarmer] Shopitem-ID is required');

        try {
            return await ShopDatabaseService.readShopItem(uuidShopItem);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getShopItem - Error reading Shopitem');
        }
    }
}