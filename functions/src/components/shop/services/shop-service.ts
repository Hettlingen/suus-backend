import {Shop} from "../model/shop";
import {databaseShop} from "../../../index";

export class ShopService {

    static async getShop(uuidShop: string): Promise<Shop> {
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        const query = `SELECT * FROM shop WHERE uuid=${uuidShop}`;

        try {
            const shopFromDb = await databaseShop.query(query);
            return shopFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] Error reading shop from database: ' + error);
        }
    }
}