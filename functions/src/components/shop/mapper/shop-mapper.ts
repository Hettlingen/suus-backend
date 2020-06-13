import {Shop} from "../model/shop";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order/order";
import {getOrderState} from "../model/order/order-state";
import {InvoiceType} from "../model/accounting/invoice-type";
import {InvoiceState} from "../model/accounting/invoice-state";
import {Amount} from "../model/accounting/amount";
import {Invoice} from "../model/accounting/invoice";

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
        shopItem.imageName = row.imageNameOfShopItem;
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
    shopItem.imageName = shopItemFromDb.imageName;

    return shopItem;
}

export const mapOrdersFromDbToOrders = (ordersFromDb: any) => {
    const orders: Order[] = [];

    for (const orderFromDb of ordersFromDb) {
        const order = new Order();
        order.uuid = orderFromDb.uuid;
        order.number = orderFromDb.number;
        order.state = getOrderState(orderFromDb.state);
        order.dateOrder = orderFromDb.dateDelivery;
        //order.invoice= mapInvoiceFromDbToInvoice(orderFromDb);
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
    //order.invoice= mapInvoiceFromDbToInvoice(orderFromDb);
    return order;
}

export const mapInvoiceFromDbToInvoice = (invoiceFromDb: any) => {
    const invoice = new Invoice();
    invoice.uuid = invoiceFromDb.uuidOfinvoice;
    invoice.type = invoiceFromDb.typeOfinvoice === 1 ? InvoiceType.CREDITCARD : InvoiceType.INVOICE;
    invoice.state = invoiceFromDb.stateOfinvoice === 1 ? InvoiceState.OFFEN : InvoiceState.BEZAHLT;
    invoice.priceTotal = new Amount(invoiceFromDb.priceTotalOfinvoice, invoiceFromDb.currencyPriceTotalOfinvoice);
    invoice.tax = new Amount(invoiceFromDb.amountTaxOfinvoice, invoiceFromDb.currencyAmountTaxOfinvoice);
    invoice.dateinvoiceDeadline = invoiceFromDb.dateinvoiceDeadlineOfinvoice;
    invoice.dateInvoice = invoiceFromDb.dateinvoiceOfinvoice;
    return invoice;
}