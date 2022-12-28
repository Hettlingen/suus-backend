import {databaseConnectionPool} from "../../../../index";
import {
    mapDeliveriesFromDbToDeliveries,
    mapDeliveryFromDbToDelivery,
    mapOrderFromDbToOrder,
    mapOrdersFromDbToOrders
} from "../../mapper/shop-mapper";
import {Delivery} from "../../model/delivery/delivery";
import {Order} from "../../model/order/order";
import {RoleProducer} from "../../../identity-access-management/partner/model/roles/role-producer";
import {OrderState} from "../../model/order/order-state";
import {ShopItemDatabase} from "./model/shop-item-database";
import {mapShopFromDbToShopDatabase, mapShopItemFromDbToShopItemDatabase} from "./mapper/shop-mapper-database";
import {ShopDatabase} from "./model/shop-database";

export class ShopDatabaseService {

    static async readShop(uuidShop: string, offset: number, limit: number): Promise<ShopDatabase> {
        console.log('START: ShopDatabaseService.readShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[ShopDatabaseService.readShop] - Wrong parameters');

        const query = `SELECT Shop.uuid, Shop.name, Shop.description,
                              ShopItem.uuid uuidOfShopItem, 
                              ShopItem.name nameOfShopItem, 
                              ShopItem.description descriptionOfShopItem,
                              ShopItem.slogan sloganOfShopItem,
                              ShopItem.category categoryOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem,
                              ShopItem.uuidImageBanner uuidImageBannerOfShopItem,
                              ShopItem.uuidImageProduct uuidImageProductOfShopItem,
                              ShopItem.uuidGallery uuidGalleryOfShopItem,
                              ShopItem.imageName imageNameOfShopItem
                            FROM Shop
                            LEFT JOIN ShopItem 
                                ON Shop.uuid=ShopItem.uuidShop
                            WHERE Shop.uuid='${uuidShop}'
                            LIMIT ${offset},${limit};`;

        try {
            const shopFromDb = await databaseConnectionPool.query(query);

            if (shopFromDb === null || shopFromDb === undefined || shopFromDb.length === 0) {
                console.log('[ShopDatabaseService.readShop] Shop doesnt exist on database');
                throw new Error('[ShopDatabaseService.readShop] Shop doesnt exist on database');
            }

            return mapShopFromDbToShopDatabase(shopFromDb);
        } catch(error) {
            console.error('[ShopDatabaseService.readShop] Error reading shop items from database: %1', error);
            throw new Error('[ShopDatabaseService.readShop] Error reading shop items from database: ' + error);
        }
    }

    static async readShopItem(uuidShopItem: string): Promise<ShopItemDatabase> {
        console.log('START: ShopDatabaseService.readShopItem: ' + uuidShopItem);
        if (!uuidShopItem) throw new Error('[ShopDatabaseService.readShopItem] - Wrong parameters');

        const query = `SELECT * FROM ShopItem WHERE ShopItem.uuid='${uuidShopItem}'`;

        try {
            const shopItemFromDb = await databaseConnectionPool.query(query);

            if (shopItemFromDb === null || shopItemFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Shopitem doesnt exist on database');
            }

            return mapShopItemFromDbToShopItemDatabase(shopItemFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Error reading shop-item details from database: ' + error);
        }
    }

    /**************************************************/
    /* START: ORDER                                   */
    /**************************************************/
    static async createOrder(order: Order): Promise<Order> {
        console.log('START: ShopDatabaseService.createOrder');

        let uuidFromDb;
        const query = `INSERT INTO Order(
                  uuid, 
                  uuidUserAccount, 
                  number, 
                  state, 
                  dateCreated, 
                  dateOrder, 
                  dateDelivery) 
                    VALUES ('${order.uuid}',
                            '${order.uuidUserAccount}',
                            '${order.number}',
                            '${order.state}', 
                            '${order.dateCreated}', 
                            '${order.dateOrder}',
                            '${order.dateDelivery}');`;

        try {
            uuidFromDb = await databaseConnectionPool.query(query);
            if (!uuidFromDb) throw new Error('Error inserting order in database.');
        } catch(error) {
            throw new Error('Error execute insert-query order: ' + error);
        }

        return this.readOrderByUuid(order.uuid);
    }

    static async readOrders(uuidUserAccount: string): Promise<Array<Order>> {
        console.log('START: ShopDatabaseService.readOrders: ' + uuidUserAccount);
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readOrders - Wrong parameters');

        const query = `SELECT Order.uuid,
                              Order.number,
                              Order.state,
                              Order.dateDelivery,
                              Invoice.uuid uuidOfInvoice,
                              Invoice.type typeOfInvoice,
                              Invoice.state stateOfInvoice,
                              Invoice.priceTotal priceTotalOfInvoice,
                              Invoice.currencyPriceTotal currencyPriceTotalOfInvoice,
                              Invoice.amountTax amountTaxOfInvoice,
                              Invoice.currencyAmountTax currencyAmountTaxOfInvoice,
                              Invoice.dateInvoiceDeadline dateInvoiceDeadlineOfInvoice,
                              Invoice.dateInvoice dateInvoiceOfInvoice
                            FROM Order
                            LEFT JOIN Invoice
                                ON Order.uuid=Invoice.uuidOrder
                            WHERE Order.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const ordersFromDb = await databaseConnectionPool.query(query);

            if (ordersFromDb === null || ordersFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrders - Orders dont exist on database');
            }

            return mapOrdersFromDbToOrders(ordersFromDb);
        } catch(error) {
            console.log('[myfarmer] ShopDatabaseService.readOrders - Error reading orders from database: ' + error);
            throw new Error('[myfarmer] ShopDatabaseService.readOrders - Error reading orders from database: ' + error);
        }
    }

    static async readOrderByUuid(uuidOrder: string): Promise<Order> {
        console.log('START: ShopDatabaseService.readOrder: ' + JSON.stringify(uuidOrder));
        if (!uuidOrder) throw new Error('[myfarmer] ShopDatabaseService.readOrder - Wrong parameters');

        const query = `SELECT Order.uuid,
                              Order.number,
                              Order.state,
                              Order.dateDelivery,
                              OrderItem.uuid uuidOfOrderItem,
                              OrderItem.quantity quantityOfOrderItem,
                              ShopItem.uuid uuidOfShopItem,
                              ShopItem.name nameOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem,
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
                            LEFT JOIN OrderItem
                                ON Order.uuid=OrderItem.uuidOrder
                            LEFT JOIN ShopItem
                                ON OrderItem.uuidShopItem=ShopItem.uuid
                            LEFT JOIN Invoice
                                ON Order.uuid=Invoice.uuidOrder
                            WHERE Order.uuid='${uuidOrder}';`;

        try {
            const orderFromDb = await databaseConnectionPool.query(query);

            if (orderFromDb === null || orderFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrder - Order doesnt exist on database');
            }

            return mapOrderFromDbToOrder(orderFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readOrder - Error reading order from database: ' + error);
        }
    }

    static async readOrderByUserAccountUuidAndState(uuidUserAccount: string, orderState: OrderState): Promise<Order> {
        console.log('START: ShopDatabaseService.readOrder with user-account-uuid: ' + JSON.stringify(uuidUserAccount));
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readOrder - Wrong parameters');

        const query = `SELECT * FROM Order WHERE Order.uuidUserAccount='${uuidUserAccount}'`;

        try {
            const orderFromDb = await databaseConnectionPool.query(query);

            if (orderFromDb === null || orderFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrder - Order doesnt exist on database');
            }

            return mapOrderFromDbToOrder(orderFromDb);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readOrder - Error reading order from database: ' + error);
        }
    }

    /**************************************************/
    /* START: DELIVERIES                              */
    /**************************************************/
    static async readDeliveries(uuidUserAccount: string): Promise<Array<Delivery>> {
        console.log('START: ShopDatabaseService.readDeliveries: ' + JSON.stringify(uuidUserAccount));
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readDeliveries - Wrong parameters');

        const query = `SELECT Delivery.uuid,
                              Delivery.number,
                              Delivery.state,
                              Delivery.dateDelivery,
                              Order.uuid uuidOfOrder,
                              Order.name nameOfOrder,
                              Order.state stateOfOrder,
                              Order.dateDelivery dateDeliveryOfOrder
                            FROM Delivery
                            LEFT JOIN Order
                                ON Order.uuidDelivery=Delivery.uuid
                            WHERE Delivery.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const deliveriesFromDb = await databaseConnectionPool.query(query);

            if (deliveriesFromDb === null || deliveriesFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readDeliveries - Deliveries dont exist on database');
            }

            return mapDeliveriesFromDbToDeliveries(deliveriesFromDb);
        } catch(error) {
            console.log('[myfarmer] ShopDatabaseService.readDeliveries - Error reading deliveries from database: ' + error);
            throw new Error('[myfarmer] ShopDatabaseService.readDeliveries - Error reading deliveries from database: ' + error);
        }
    }

    static async readDelivery(uuidDelivery: string): Promise<Delivery> {
        console.log('START: ShopDatabaseService.readDelivery: ' + JSON.stringify(uuidDelivery));
        if (!uuidDelivery) throw new Error('[myfarmer] ShopDatabaseService.readDelivery - Wrong parameters');

        const query = `SELECT Delivery.uuid,
                              Delivery.number,
                              Delivery.state,
                              Delivery.dateDelivery,
                              Order.uuid uuidOfOrder,
                              Order.number numberOfOrder,
                              Order.state stateOfOrder,
                              Order.dateOrder dateOrderOfOrder,
                              Order.dateDelivery dateDeliveryOfOrder
                            FROM Delivery
                            LEFT JOIN Order
                                ON Order.uuidDelivery=Delivery.uuid
                            WHERE Delivery.uuid='${uuidDelivery}';`;

        try {
            const deliveryFromDb = await databaseConnectionPool.query(query);

            if (deliveryFromDb === null || deliveryFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readDelivery - Delivery doesnt exist on database');
            }

            return mapDeliveryFromDbToDelivery(deliveryFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readDelivery - Error reading delivery from database: ' + error);
        }
    }

    static async updateProducer(roleProducer: RoleProducer) {
        return undefined;
    }
}
