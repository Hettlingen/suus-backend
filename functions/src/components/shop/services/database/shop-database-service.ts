import {databaseShop} from "../../../../index";
import {Shop} from "../../model/shop";
import {mapOrdersFromDbToOrders, mapShopFromDbToShop, mapShopItemFromDbToShopItem} from "../../mapper/shop-mapper";
import {ShopItem} from "../../model/shop-item";
import {Order} from "../../model/order";

export class ShopDatabaseService {

    static async readShop(uuidShop: string): Promise<Shop> {
        console.log('START: ShopDatabaseService.readShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] ShopDatabaseService.readShop - Wrong parameters');

        const query = `SELECT Shop.uuid, Shop.name, Shop.description,
                              ShopItem.uuid uuidOfShopItem, 
                              ShopItem.name nameOfShopItem, 
                              ShopItem.description descriptionOfShopItem,
                              ShopItem.category categoryOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem,
                              ShopItem.imageName imageNameOfShopItem
                            FROM Shop 
                            LEFT JOIN ShopItem 
                                ON Shop.uuid=ShopItem.uuidShop
                                WHERE Shop.uuid='${uuidShop}';`;

        try {
            const shopFromDb = await databaseShop.query(query);

            if (shopFromDb === null || shopFromDb === undefined || shopFromDb.length === 0) {
                throw new Error('[myfarmer] ShopDatabaseService.readShop - Shop doesnt exist on database');
            }

            return mapShopFromDbToShop(shopFromDb);;
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readShop - Error reading shop details from database: ' + error);
        }
    }

    static async readShopItem(uuidShopItem: string): Promise<ShopItem> {
        console.log('START: ShopDatabaseService.readShopItem: ' + uuidShopItem);
        if (!uuidShopItem) throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Wrong parameters');

        const query = `SELECT * FROM ShopItem WHERE ShopItem.uuid='${uuidShopItem}'`;

        try {
            const shopItemFromDb = await databaseShop.query(query);

            if (shopItemFromDb === null || shopItemFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Shopitem doesnt exist on database');
            }

            return mapShopItemFromDbToShopItem(shopItemFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Error reading shop-item details from database: ' + error);
        }
    }

    static async readOrders(uuidUserAccount: string): Promise<Array<Order>> {
        console.log('START: ShopDatabaseService.readOrders: ' + JSON.stringify(uuidUserAccount));
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readOrders - Wrong parameters');

        const query = `SELECT * FROM Orders WHERE Orders.uuidUserAccount='${uuidUserAccount}'`;

        // const query = `SELECT Orders.uuid,
        //                       Orders.number,
        //                       Orders.state,
        //                       Orders.dateDelivery,
        //                       Payment.uuid uuidOfPayment,
        //                       Payment.type typeOfPayment,
        //                       Payment.state stateOfPayment,
        //                       Payment.priceTotal priceTotalOfPayment,
        //                       Payment.currencyPriceTotal currencyPriceTotalOfPayment,
        //                       Payment.amountTax amountTaxOfPayment,
        //                       Payment.currencyAmountTax currencyAmountTaxOfPayment,
        //                       Payment.datePaymentDeadline datePaymentDeadlineOfPayment,
        //                       Payment.datePayment datePaymentOfPayment
        //                     FROM Orders
        //                     LEFT JOIN Payment
        //                         ON Orders.uuid=Payment.uuidOrder
        //                         WHERE Orders.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const ordersFromDb = await databaseShop.query(query);

            console.log('Orders Database: ' + JSON.stringify(ordersFromDb));

            if (ordersFromDb === null || ordersFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrders - Orders dont exist on database');
            }

            return mapOrdersFromDbToOrders(ordersFromDb);
        } catch(error) {
            console.error('[myfarmer] ShopDatabaseService.readOrders - Error reading orders from database: '  + error)
            throw new Error('[myfarmer] ShopDatabaseService.readOrders - Error reading orders from database: ' + error);
        }
    }
}