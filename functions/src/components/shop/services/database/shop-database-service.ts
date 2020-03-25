import {databaseShop} from "../../../../index";
import {Shop} from "../../model/shop";

export class ShopDatabaseService {

    static async readShop(uuidShop: string): Promise<Shop> {
        console.log('START: BlogDatabseService.readBlog: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] BlogDatabseService.readBlog - Wrong parameters');

        const query = `SELECT * FROM Shop WHERE uuid=${uuidShop}`;

        try {
            const shopFromDb = await databaseShop.query(query);

            if (shopFromDb === null || shopFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readShop - Shop doesnt exist on database');
            }

            return shopFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] BlogDatabseService.readBlog - Error reading user-account from database: ' + error);
        }
    }
}