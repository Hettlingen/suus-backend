import {Shop} from "../model/shop";
import {databaseShop} from "../../../index";

export class ShopService {

    static async getShop(uuidShop: string): Promise<Shop> {
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        const query = `SELECT * FROM shop WHERE uuid=${uuidShop}`;

        try {
            const shopFromDb = await databaseShop.query(query);

            console.log('query-result: ' + shopFromDb);
            console.log('Index 1 of query-result: ' + shopFromDb[0]);

            return shopFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] Error reading shop from database: ' + error);
        }
    }
}