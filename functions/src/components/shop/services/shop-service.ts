import {mapShopFromDbToShop} from "./shop-mapper";
import {Shop} from "../model/shop";
import {databaseMySql} from "../../../index";

export class ShopService {

    static async getShop(uuidShop: string): Promise<Shop> {
        if (!uuidShop) throw new Error('Product ID is required');
        let query = `SELECT * FROM shops WHERE uuid=${uuidShop}`;

        try {
            try {
                const shopFromDb = databaseMySql.query(query);
                return mapShopFromDbToShop(shopFromDb);
            }
            catch (error) {
                throw new Error('No products found');
            }
        } catch(error){
            throw new Error('Product doesnt exist.')
        }
    }
}