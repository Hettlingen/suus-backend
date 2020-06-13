import {databaseShop} from "../../../../index";
import {Shop} from "../../model/shop";
import {
    mapOrderFromDbToOrder,
    mapOrdersFromDbToOrders,
    mapShopFromDbToShop,
    mapShopItemFromDbToShopItem
} from "../../mapper/shop-mapper";
import {ShopItem} from "../../model/shop-item";
import {Order} from "../../model/order/order";
import {OrderState} from "../../model/order/order-state";

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

        // const query = `SELECT * FROM Orders WHERE Orders.uuidUserAccount='${uuidUserAccount}'`;

        const query = `SELECT Orders.uuid,
                              Orders.number,
                              Orders.state,
                              Orders.dateDelivery,
                              Invoice.uuid uuidOfInvoice,
                              Invoice.type typeOfInvoice,
                              Invoice.state stateOfInvoice,
                              Invoice.priceTotal priceTotalOfInvoice,
                              Invoice.currencyPriceTotal currencyPriceTotalOfInvoice,
                              Invoice.amountTax amountTaxOfInvoice,
                              Invoice.currencyAmountTax currencyAmountTaxOfInvoice,
                              Invoice.dateInvoiceDeadline dateInvoiceDeadlineOfInvoice,
                              Invoice.dateInvoice dateInvoiceOfInvoice
                            FROM Orders
                            LEFT JOIN Invoice
                                ON Orders.uuid=Invoice.uuidOrder
                                WHERE Orders.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const ordersFromDb = await databaseShop.query(query);

            console.log('Orders Database: ' + JSON.stringify(ordersFromDb));

            if (ordersFromDb === null || ordersFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrders - Orders dont exist on database');
            }

            return mapOrdersFromDbToOrders(ordersFromDb);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readOrders - Error reading orders from database: ' + error);
        }
    }

    static async readOrder(uuidOrder: string): Promise<Order> {
        console.log('START: ShopDatabaseService.readOrder: ' + JSON.stringify(uuidOrder));
        if (!uuidOrder) throw new Error('[myfarmer] ShopDatabaseService.readOrder - Wrong parameters');

        const query = `SELECT * FROM Orders WHERE Orders.uuid='${uuidOrder}'`;

        try {
            const orderFromDb = await databaseShop.query(query);

            if (orderFromDb === null || orderFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrder - Order doesnt exist on database');
            }

            return mapOrderFromDbToOrder(orderFromDb);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readOrder - Error reading order from database: ' + error);
        }
    }

    static async readOrderByUserAccountUuidAndState(uuidUserAccount: string, orderState: OrderState): Promise<Order> {
        console.log('START: ShopDatabaseService.readOrder with user-account-uuid: ' + JSON.stringify(uuidUserAccount));
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readOrder - Wrong parameters');

        const query = `SELECT * FROM Orders WHERE Orders.uuidUserAccount='${uuidUserAccount}'`;

        try {
            const orderFromDb = await databaseShop.query(query);

            if (orderFromDb === null || orderFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrder - Order doesnt exist on database');
            }

            return mapOrderFromDbToOrder(orderFromDb);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readOrder - Error reading order from database: ' + error);
        }
    }
}