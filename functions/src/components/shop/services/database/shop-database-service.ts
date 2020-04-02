import {databaseShop} from "../../../../index";
import {Shop} from "../../model/shop";
import {mapShopFromDbToShop} from "../../mapper/shop-mapper";

export class ShopDatabaseService {

    static async readShop(uuidShop: string): Promise<Shop> {
        console.log('START: ShopDatabaseService.readShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] ShopDatabaseService.readShop - Wrong parameters');

        const query = `SELECT Shop.uuid, Shop.name, Shop.description,
                              ShopItem.uuid uuidOfShopItem, 
                              ShopItem.name nameOfShopItem, 
                              ShopItem.description descriptionOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem
                            FROM Shop 
                            LEFT JOIN ShopItem 
                                ON Shop.uuid=ShopItem.uuidShop
                                WHERE Shop.uuid='${uuidShop}';`;

        try {
            const shopFromDb = await databaseShop.query(query);

            console.log('Die Shop-Daten lauten: ' + JSON.stringify(shopFromDb));

            if (shopFromDb === null || shopFromDb === undefined || shopFromDb.length == 0) {
                throw new Error('[myfarmer] ShopDatabaseService.readShop - Shop doesnt exist on database');
            }

            let shop = mapShopFromDbToShop(shopFromDb);

            console.log('Die Shop-Daten gemapped lauten: ' + JSON.stringify(shop));

            return shop;
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readShop - Error reading shop details from database: ' + error);
        }
    }
}