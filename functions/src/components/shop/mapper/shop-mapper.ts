import {Shop} from "../model/shop";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order";
import {getOrderState} from "../utils/codes/OrderState";

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

    ordersFromDb.forEach(
        (orderFromDb: any) => {
            orders.push(mapOrderFromDbToOrder(orderFromDb));
        }
    );

    return orders;
}

export const mapOrderFromDbToOrder = (orderFromDb: any) => {
    const order = new Order();
    order.uuid = orderFromDb.uuid;
    order.number = orderFromDb.number;
    order.state = getOrderState(orderFromDb.state);
    order.dateOrder = orderFromDb.dateDelivery;
    //order.payment= mapPaymentFromDbToPayment(orderFromDb);
    return order;
}

// export const mapPaymentFromDbToPayment = (paymentFromDb: any) => {
//     const payment = new Payment();
//     payment.uuid = paymentFromDb.uuidOfPayment;
//     payment.type = paymentFromDb.typeOfPayment === 1 ? PaymentType.CREDITCARD : PaymentType.INVOICE;
//     payment.state = paymentFromDb.stateOfPayment === 1 ? PaymentState.OFFEN : PaymentState.BEZAHLT;
//     payment.priceTotal = new Amount(paymentFromDb.priceTotalOfPayment, paymentFromDb.currencyPriceTotalOfPayment);
//     payment.amountTax = new Amount(paymentFromDb.amountTaxOfPayment, paymentFromDb.currencyAmountTaxOfPayment);
//     payment.datePaymentDeadline = paymentFromDb.datePaymentDeadlineOfPayment;
//     payment.datePayment = paymentFromDb.datePaymentOfPayment;
//     return payment;
// }