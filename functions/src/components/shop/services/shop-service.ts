import {Shop} from "../model/shop";
import {databaseShop} from "../../../index";
import {mapShopFromDbToShop} from "./shop-mapper";

export class ShopService {

    static async getShop(uuidShop: string): Promise<Shop> {
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        let query = `SELECT * FROM shop WHERE uuid=${uuidShop}`;

        try {
            console.log('[myfarmer] START Query');
            const shopFromDb = databaseShop.query(query);
            console.log('[myfarmer] END Query');

            databaseShop.query(query)
                .then(() => {
                    return mapShopFromDbToShop(shopFromDb);
                }).catch(function(error: any){
                    throw new Error('[myFarmer] Shop doesnt exist on database.')
            });
            return shopFromDb;
        } catch(error){
            console.log('[myfarmer] ' + error);
            throw new Error('[myfarmer] Error reading shop from database');
        }
    }
}