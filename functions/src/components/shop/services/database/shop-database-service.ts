import {database} from "../../../../index";
import {Shop} from "../../model/shop";
import {
    mapShopFromDbToShop,
    mapShoppingCartFromDbToShoppingCart,
    mapShopItemFromDbToShopItem,
    mapOrdersFromDbToOrders,
    mapDeliveriesFromDbToDeliveries,
    mapDeliveryFromDbToDelivery,
    mapOrderFromDbToOrder
} from "../../mapper/shop-mapper";
import {ShopItem} from "../../model/shop-item";
import {Delivery} from "../../model/delivery/delivery";
import {ShoppingCart} from "../../model/order/shopping-cart";
import {Order} from "../../model/order/order";
import {RoleProducer} from "../../../identity-access-management/partner/model/roles/role-producer";
import {OrderState} from "../../model/order/order-state";

export class ShopDatabaseService {

    static async readShop(uuidShop: string, offset: number, limit: number): Promise<Shop> {
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
                            WHERE Shop.uuid='${uuidShop}'
                            LIMIT ${offset},${limit};`;

        try {
            const shopFromDb = await database.query(query);

            if (shopFromDb === null || shopFromDb === undefined || shopFromDb.length === 0) {
                console.log('[myfarmer] ShopDatabaseService.readShop - Shop doesnt exist on database');
                throw new Error('[myfarmer] ShopDatabaseService.readShop - Shop doesnt exist on database');
            }

            return mapShopFromDbToShop(shopFromDb);;
        } catch(error) {
            console.log('[myfarmer] ShopDatabaseService.readShop - Error reading shop items from database: ' + error);
            throw new Error('[myfarmer] ShopDatabaseService.readShop - Error reading shop items from database: ' + error);
        }
    }

    static async readShopItem(uuidShopItem: string): Promise<ShopItem> {
        console.log('START: ShopDatabaseService.readShopItem: ' + uuidShopItem);
        if (!uuidShopItem) throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Wrong parameters');

        const query = `SELECT * FROM ShopItem WHERE ShopItem.uuid='${uuidShopItem}'`;

        try {
            const shopItemFromDb = await database.query(query);

            if (shopItemFromDb === null || shopItemFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Shopitem doesnt exist on database');
            }

            return mapShopItemFromDbToShopItem(shopItemFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readShopItem - Error reading shop-item details from database: ' + error);
        }
    }

    /**************************************************/
    /* START: SHOPPING CART                           */
    /**************************************************/
    static async createShoppingCart(shoppingCart: ShoppingCart): Promise<ShoppingCart> {
        console.log('START: ShopDatabaseService.createShoppingCart');

        const queryShppingCart = `INSERT INTO ShoppingCart(uuid, uuidUserAccount, dateCreated) VALUES ('${shoppingCart.uuid}', '${shoppingCart.uuidUserAccount}', '${shoppingCart.dateCreated}')`;

        database.query(queryShppingCart, function (error: any, result: any) {
            if (error) throw error;


            let listOrderItems = shoppingCart.listOrderItem;
            var queryOrderItems = `INSERT INTO OrderItem(uuid, uuidUserAccount, dateCreated) VALUES ('${shoppingCart.uuid}', '${shoppingCart.uuidUserAccount}', '${shoppingCart.dateCreated}')`;

            database.query(queryOrderItems, [listOrderItems] , function (err: any, resultOrderItem: any) {
                if (err) throw err;
                console.log(result.affectedRows + " record inserted");
            });
        });

        return new ShoppingCart();
    }

    static async saveShoppingCart(shoppingCart: ShoppingCart): Promise<ShoppingCart> {
        console.log('START: ShopDatabaseService.saveShoppingCart');
        const query = `UPDATE ShoppingCart SET 'uuid' = '${shoppingCart.uuid}', 'uuidUserAccount' = '${shoppingCart.uuidUserAccount}'`;

        try {
            const uuidFromDb = await database.query(query);
            if (!uuidFromDb) throw new Error('[myfarmer] Error inserting post in database.');
        } catch(error) {
            throw new Error('[myfarmer] Error execute insert-query post: ' + error);
        }

        return this.readShoppingCartByUuid(shoppingCart.uuid);
    }

    static async readShoppingCartByUuid(uuidShoppingCart: string): Promise<ShoppingCart> {
        console.log('START: ShopDatabaseService.readShoppingCartByUuid: ' + uuidShoppingCart);
        if (!uuidShoppingCart) throw new Error('ShopDatabaseService.readShoppingCartByUuid - Wrong parameters');

        const query = `SELECT ShoppingCart.uuid,
                              ShoppingCart.uuidUserAccount,
                              ShoppingCart.dateCreated,
                              OrderItems.uuid uuidOfOrderItem,
                              OrderItems.quantity quantityOfOrderItem,
                              ShopItem.uuid uuidOfShopItem,
                              ShopItem.name nameOfShopItem,
                              ShopItem.description describtionOfShopItem,
                              ShopItem.category categoryOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem,
                              ShopItem.quantity quantityOfShopItem,
                              ShopItem.imageName imageNameOfShopItem,
                              ShopItem.dateCreated dateCreatedOfShopItem,
                              ShopItem.dateUpdated dateUpdatedOfShopItem,
                              ShopItem.datePublished datePublishedOfShopItem
                            FROM ShoppingCart
                            LEFT JOIN OrderItem
                                ON OrderItem.uuidShoppingCart=ShoppingCart.uuid
                            WHERE ShoppingCart.uuid='${uuidShoppingCart}';`;

        try {
            const shoppingCartFromDb = await database.query(query);

            if (shoppingCartFromDb === null || shoppingCartFromDb === undefined) {
                throw new Error('ShopDatabaseService.readShoppingCartByUuid - Shopping cart doesnt exist on database');
            }

            return mapShoppingCartFromDbToShoppingCart(shoppingCartFromDb[0]);
        } catch(error) {
            throw new Error('ShopDatabaseService.readDelivery - Error reading delivery from database: ' + error);
        }
    }
            
    static async readShoppingCartByUuidUserAccount(uuidUserAccount: string): Promise<ShoppingCart> {
        return new ShoppingCart();
    }

    static async deleteShoppingCart(uuidUserAccount: string): Promise<boolean> {
        return true;
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
            uuidFromDb = await database.query(query);
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
                              Invoice. uuid uuidOfInvoice,
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
            const ordersFromDb = await database.query(query);

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
            const orderFromDb = await database.query(query);

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
            const orderFromDb = await database.query(query);

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
            const deliveriesFromDb = await database.query(query);

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
            const deliveryFromDb = await database.query(query);

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
