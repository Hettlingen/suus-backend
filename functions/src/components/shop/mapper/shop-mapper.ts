import {Shop} from "../model/shop";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order/order";
import {getOrderState} from "../model/order/order-state";
import {InvoiceType} from "../model/accounting/invoice-type";
import {InvoiceState} from "../model/accounting/invoice-state";
import {Amount} from "../model/accounting/amount";
import {Invoice} from "../model/accounting/invoice";
import {OfferItem} from "../model/offer/offer-item";
import {getOfferItemState} from "../model/offer/offer-item-state";
import {Delivery} from "../model/delivery/delivery";
import {getDeliveryState} from "../model/delivery/delivery-state";
import {ShoppingCart} from "../model/order/shopping-cart";
import {OrderItem} from "../model/order/order-item";

export const mapShopFromDbToShop = (shopFromDb: any) => {
    const shop = new Shop();

    shop.uuid = shopFromDb[0].uuid;
    shop.name = shopFromDb[0].name;
    shop.description = shopFromDb[0].description;

    for (const row of shopFromDb) {
        const shopItem = new ShopItem();
        shopItem.uuid = row.uuidOfShopItem;
        shopItem.name = row.nameOfShopItem;
        shopItem.description = row.descriptionOfShopItem;
        shopItem.category = row.categoryOfShopItem;
        shopItem.price = row.priceOfShopItem;
        shopItem.currencyPrice = row.currencyPriceOfShopItem;
        shop.listShopItem.push(shopItem);
    }

    return shop;
}

export const mapShopItemFromDbToShopItem = (shopItemFromDb: any) => {
    const shopItem = new ShopItem();
    shopItem.uuid = shopItemFromDb.uuid;
    shopItem.name = shopItemFromDb.name;
    shopItem.description = shopItemFromDb.description;
    shopItem.category = shopItemFromDb.categoryOfShopItem;
    shopItem.price = shopItemFromDb.price;
    shopItem.currencyPrice = shopItemFromDb.currencyPrice;
    return shopItem;
}

export const mapShoppingCartFromDbToShoppingCart = (shoppingCartFromDb: any) => {
    const shoppingCart = new ShoppingCart();
    shoppingCart.uuid = shoppingCartFromDb[0].uuid;

    for (const orderItemFromDb of shoppingCartFromDb) {
        const orderItem = new OrderItem();
        orderItem.uuid = orderItemFromDb.uuidOfOrderItem;
        shoppingCart.listOrderItem.push(orderItem);
    }

    return shoppingCart;
}

export const mapOrdersFromDbToOrders = (ordersFromDb: any) => {
    const orders: Order[] = [];

    for (const orderFromDb of ordersFromDb) {
        const order = new Order();
        order.uuid = orderFromDb.uuid;
        order.number = orderFromDb.number;
        order.state = getOrderState(orderFromDb.state);
        order.dateOrder = orderFromDb.dateDelivery;
        order.invoice= mapInvoiceFromDbToInvoice(orderFromDb);
        orders.push(order);
    }

    return orders;
}

export const mapOrderFromDbToOrder = (orderFromDb: any) => {
    const order = new Order();
    order.uuid = orderFromDb.uuid;
    order.number = orderFromDb.number;
    order.state = getOrderState(orderFromDb.state);
    order.dateOrder = orderFromDb.dateDelivery;
    order.invoice= mapInvoiceFromDbToInvoice(orderFromDb);
    return order;
}

export const mapInvoiceFromDbToInvoice = (invoiceFromDb: any) => {
    const invoice = new Invoice();
    invoice.uuid = invoiceFromDb.uuidOfinvoice;
    invoice.type = invoiceFromDb.typeOfinvoice === 1 ? InvoiceType.CREDITCARD : InvoiceType.INVOICE;
    invoice.state = invoiceFromDb.stateOfinvoice === 1 ? InvoiceState.OFFEN : InvoiceState.BEZAHLT;
    invoice.priceTotal = new Amount(invoiceFromDb.priceTotalOfInvoice, invoiceFromDb.currencyPriceTotalOfInvoice);
    invoice.tax = new Amount(invoiceFromDb.amountTaxOfInvoice, invoiceFromDb.currencyAmountTaxOfInvoice);
    invoice.dateinvoiceDeadline = invoiceFromDb.dateinvoiceDeadlineOfinvoice;
    invoice.dateInvoice = invoiceFromDb.dateinvoiceOfinvoice;
    return invoice;
}

export const mapOfferItemsFromDbToOfferItems = (offerItemsFromDb: any) => {
    const offerItems: OfferItem[] = [];

    for (const offerItemFromDb of offerItemsFromDb) {
        offerItems.push(mapOfferItemFromDbToOfferItem(offerItemFromDb));
    }

    return offerItems;
}

export const mapOfferItemFromDbToOfferItem = (offerItemFromDb: any) => {
    const offerItem = new OfferItem();
    offerItem.uuid = offerItemFromDb.uuid;
    offerItem.state = getOfferItemState(offerItemFromDb.state);
    offerItem.quantity = offerItemFromDb.quantity;

    const shopItem = new ShopItem();
    shopItem.uuid = offerItemFromDb.uuidOfShopItem;
    shopItem.name = offerItemFromDb.nameOfShopItem;
    shopItem.description = offerItemFromDb.descriptionOfShopItem;
    shopItem.category = offerItemFromDb.categoryOfShopItem;
    shopItem.price = offerItemFromDb.priceOfShopItem;
    shopItem.currencyPrice = offerItemFromDb.currencyPriceOfShopItem;
    offerItem.shopItem= shopItem;

    return offerItem;
}

export const mapDeliveriesFromDbToDeliveries = (deliveriesFromDb: any) => {
    const deliveries: Delivery[] = [];

    for (const deliveryFromDb of deliveriesFromDb) {
        deliveries.push(mapDeliveryFromDbToDelivery(deliveryFromDb));
    }

    return deliveries;
}

export const mapDeliveryFromDbToDelivery = (deliveryFromDb: any) => {
    const delivery = new Delivery();
    delivery.uuid = deliveryFromDb.uuid;
    delivery.uuidUserAccount = deliveryFromDb.uuid;
    delivery.number = deliveryFromDb.uuid;
    delivery.state = getDeliveryState(deliveryFromDb.state);
    delivery.dateDelivery = deliveryFromDb.quantity;

    const order = new Order();
    order.uuid = deliveryFromDb.uuidOfOrder;
    order.number = deliveryFromDb.numberOfOrder;
    order.state = deliveryFromDb.stateOfOrder;
    order.dateOrder = deliveryFromDb.dateOrderOfOrder;
    order.dateDelivery = deliveryFromDb.dateDeliveryOfOrder;
    delivery.order = order;

    return delivery;
}
