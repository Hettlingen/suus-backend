import {database} from "../../../../index";
import {Shop} from "../../model/shop";
import {
    mapDeliveriesFromDbToDeliveries, mapDeliveryFromDbToDelivery,
    mapOfferItemFromDbToOfferItem, mapOfferItemsFromDbToOfferItems,
    mapOrderFromDbToOrder,
    mapOrdersFromDbToOrders,
    mapShopFromDbToShop,
    mapShopItemFromDbToShopItem
} from "../../mapper/shop-mapper";
import {ShopItem} from "../../model/shop-item";
import {Order} from "../../model/order/order";
import {OrderState} from "../../model/order/order-state";
import {OfferItem} from "../../model/offer/offer-item";
import {Delivery} from "../../model/delivery/delivery";

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
            const shopFromDb = await database.query(query);

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
            const shopItemFromDb = await database.query(query);

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

        const query = `SELECT Orders.uuid,
                              Orders.number,
                              Orders.state,
                              Orders.dateDelivery,
                              Invoice. uuid uuidOfInvoice,
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

    static async readOrder(uuidOrder: string): Promise<Order> {
        console.log('START: ShopDatabaseService.readOrder: ' + JSON.stringify(uuidOrder));
        if (!uuidOrder) throw new Error('[myfarmer] ShopDatabaseService.readOrder - Wrong parameters');

        const query = `SELECT Orders.uuid,
                              Orders.number,
                              Orders.state,
                              Orders.dateDelivery,
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
                                ON Orders.uuid=OrderItem.uuidOrder
                            LEFT JOIN ShopItem
                                ON OrderItem.uuidShopItem=ShopItem.uuid
                            LEFT JOIN Invoice
                                ON Orders.uuid=Invoice.uuidOrder
                            WHERE Orders.uuid='${uuidOrder}';`;

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

        const query = `SELECT * FROM Orders WHERE Orders.uuidUserAccount='${uuidUserAccount}'`;

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

    static async readOfferItems(uuidUserAccount: string): Promise<Array<OfferItem>> {
        console.log('START: ShopDatabaseService.readOfferItems: ' + JSON.stringify(uuidUserAccount));
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readOfferItems - Wrong parameters');

        const query = `SELECT OfferItem.uuid,
                              OfferItem.number,
                              OfferItem.state,
                              ShopItem.uuid uuidOfShopItem,
                              ShopItem.name nameOfShopItem,
                              ShopItem.description descriptionOfShopItem,
                              ShopItem.category categoryOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem
                            FROM Orders
                            LEFT JOIN ShopItem
                                ON OfferItem.uuidShopItem=ShopItem.uuid
                            WHERE OfferItem.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const offerItemsFromDb = await database.query(query);

            console.log('OfferItems with Shopitem: ' + JSON.stringify(offerItemsFromDb));

            if (offerItemsFromDb === null || offerItemsFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOrders - Orders dont exist on database');
            }

            return mapOfferItemsFromDbToOfferItems(offerItemsFromDb);
        } catch(error) {
            console.log('[myfarmer] ShopDatabaseService.readOfferItems - Error reading orders from database: ' + error);
            throw new Error('[myfarmer] ShopDatabaseService.readOfferItems - Error reading orders from database: ' + error);
        }
    }

    static async readOfferItem(uuidOfferItem: string): Promise<OfferItem> {
        console.log('START: ShopDatabaseService.readOfferItem: ' + JSON.stringify(uuidOfferItem));
        if (!uuidOfferItem) throw new Error('[myfarmer] ShopDatabaseService.readOfferItem - Wrong parameters');

        const query = `SELECT OfferItem.uuid,
                              OfferItem.number,
                              OfferItem.state,
                              OfferItem.quantity,
                              ShopItem.uuid uuidOfShopItem,
                              ShopItem.name nameOfShopItem,
                              ShopItem.description descriptionOfShopItem,
                              ShopItem.category categoryOfShopItem,
                              ShopItem.price priceOfShopItem,
                              ShopItem.currencyPrice currencyPriceOfShopItem
                            FROM OfferItem
                            LEFT JOIN ShopItem
                                ON OfferItem.uuidShopItem=ShopItem.uuid
                            WHERE OfferItem.uuid='${uuidOfferItem}';`;

        try {
            const offerItemFromDb = await database.query(query);

            console.log('OfferItem with Shopitem: ' + JSON.stringify(offerItemFromDb));

            if (offerItemFromDb === null || offerItemFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readOfferItem - Offer-item doesnt exist on database');
            }

            return mapOfferItemFromDbToOfferItem(offerItemFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readOfferItem - Error reading offer-item from database: ' + error);
        }
    }

    static async readDeliveries(uuidUserAccount: string): Promise<Array<Delivery>> {
        console.log('START: ShopDatabaseService.readDeliveries: ' + JSON.stringify(uuidUserAccount));
        if (!uuidUserAccount) throw new Error('[myfarmer] ShopDatabaseService.readDeliveries - Wrong parameters');

        const query = `SELECT Delivery.uuid,
                              Delivery.number,
                              Delivery.state,
                              Delivery.dateDelivery,
                              Orders.uuid uuidOfOrder,
                              Orders.name nameOfOrder,
                              Orders.state stateOfOrder,
                              Orders.dateDelivery dateDeliveryOfOrder
                            FROM Delivery
                            LEFT JOIN Orders
                                ON Orders.uuidDelivery=Delivery.uuid
                            WHERE Delivery.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const deliveriesFromDb = await database.query(query);

            console.log('Deliveries with Order: ' + JSON.stringify(deliveriesFromDb));

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
                              Orders.uuid uuidOfOrder,
                              Orders.number numberOfOrder,
                              Orders.state stateOfOrder,
                              Orders.dateOrder dateOrderOfOrder,
                              Orders.dateDelivery dateDeliveryOfOrder
                            FROM Delivery
                            LEFT JOIN Orders
                                ON Orders.uuidDelivery=Delivery.uuid
                            WHERE Delivery.uuid='${uuidDelivery}';`;

        try {
            const deliveryFromDb = await database.query(query);

            console.log('Delivery with Order: ' + JSON.stringify(deliveryFromDb));

            if (deliveryFromDb === null || deliveryFromDb === undefined) {
                throw new Error('[myfarmer] ShopDatabaseService.readDelivery - Delivery doesnt exist on database');
            }

            return mapDeliveryFromDbToDelivery(deliveryFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] ShopDatabaseService.readDelivery - Error reading delivery from database: ' + error);
        }
    }
}
