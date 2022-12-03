import {Order} from "../../functions/src/components/shop/model/order/order";
import {Shop} from "../../functions/src/components/shop/model/shop";
import {Invoice} from "../../functions/src/components/shop/model/accounting/invoice";
import {ShoppingCart} from "../../functions/src/components/shop/model/order/shopping-cart";
import {OrderItem} from "../../functions/src/components/shop/model/order/order-item";
import {Amount} from "../../functions/src/components/shop/model/accounting/amount";
import {ShopItem} from "../../functions/src/components/shop/model/shop-item";
import {Delivery} from "../../functions/src/components/shop/model/delivery/delivery";
import {InvoiceState} from "../../functions/src/components/shop/model/accounting/invoice-state";
import {OrderState} from "../../functions/src/components/shop/model/order/order-state";
import {InvoiceType} from "../../functions/src/components/shop/model/accounting/invoice-type";


const SHOP_ITEM_1 = new ShopItem();
SHOP_ITEM_1.uuid = '1';
SHOP_ITEM_1.name = 'SUUS - Tamarind Juice [JSON]';
SHOP_ITEM_1.description = 'BIO-Juice...';
SHOP_ITEM_1.category = 1;
SHOP_ITEM_1.imageName = 'juice.png';
SHOP_ITEM_1.price = 4.50;
SHOP_ITEM_1.currencyPrice = 'CHF';

const SHOP_ITEM_2 = new ShopItem();
SHOP_ITEM_2.uuid = '2';
SHOP_ITEM_2.name = 'SUUS - Guava Juice [JSON]';
SHOP_ITEM_2.description = 'BIO-Juice...';
SHOP_ITEM_2.category = 1;
SHOP_ITEM_2.imageName = 'juice.png';
SHOP_ITEM_2.price = 4.50;
SHOP_ITEM_2.currencyPrice = 'CHF';

const SHOP_ITEM_3 = new ShopItem();
SHOP_ITEM_3.uuid = '3';
SHOP_ITEM_3.name = 'SUUS - Pure Water [JSON]';
SHOP_ITEM_3.description = 'The water from our Swiss Alps...';
SHOP_ITEM_3.category = 1;
SHOP_ITEM_3.imageName = 'juice.png';
SHOP_ITEM_3.price = 2.50;
SHOP_ITEM_3.currencyPrice = 'CHF';

const SHOP_ITEM_4 = new ShopItem();
SHOP_ITEM_4.uuid = '4';
SHOP_ITEM_4.name = 'SUUS - Wheat Beer [JSON]';
SHOP_ITEM_4.description = 'Our beer...';
SHOP_ITEM_4.category = 1;
SHOP_ITEM_4.imageName = 'juice.png';
SHOP_ITEM_4.price = 3.50;
SHOP_ITEM_4.currencyPrice = 'CHF';

const SHOP_ITEM_5 = new ShopItem();
SHOP_ITEM_5.uuid = '5';
SHOP_ITEM_5.name = 'SUUS - Amber Beer [JSON]';
SHOP_ITEM_5.description = 'Our amber beer...';
SHOP_ITEM_5.category = 1;
SHOP_ITEM_5.imageName = 'juice.png';
SHOP_ITEM_5.price = 3.50;
SHOP_ITEM_5.currencyPrice = 'CHF';

export const SHOP_ITEMS: Array<ShopItem> = [
  SHOP_ITEM_1,
  SHOP_ITEM_2,
  SHOP_ITEM_3,
  SHOP_ITEM_4,
  SHOP_ITEM_5
];

const ORDER_ITEM_1 = new OrderItem();
ORDER_ITEM_1.uuid = '1';
ORDER_ITEM_1.quantity = 1;
ORDER_ITEM_1.shopItem = SHOP_ITEM_1;

const ORDER_ITEMS: Array<OrderItem> = [
  ORDER_ITEM_1,
];

const PAYMENT_1 = new Invoice();
PAYMENT_1.priceTotal = new Amount(120.30, 'CHF');
PAYMENT_1.state = InvoiceState.OFFEN; // offen
PAYMENT_1.type = InvoiceType.CREDITCARD;
PAYMENT_1.dateInvoice = new Date();

const PAYMENT_2 = new Invoice();
PAYMENT_2.priceTotal = new Amount(320.50, 'CHF');
PAYMENT_2.state = InvoiceState.BEZAHLT; // bezahlt
PAYMENT_2.type = InvoiceType.INVOICE;
PAYMENT_2.dateInvoice = new Date();

export const ORDER_1 = new Order();
ORDER_1.uuid = '1';
ORDER_1.number = 10001;
ORDER_1.state = OrderState.OPEN;
ORDER_1.dateOrder = new Date('2020-01-24T16:00:00.000Z');
ORDER_1.dateDelivery = new Date();
ORDER_1.listOrderItem = ORDER_ITEMS;
ORDER_1.invoice = PAYMENT_1;

export const ORDER_2 = new Order();
ORDER_2.uuid = '2';
ORDER_2.number = 10002;
ORDER_2.state = OrderState.CLOSED;
ORDER_2.dateOrder = new Date();
ORDER_2.dateDelivery = new Date();
ORDER_2.listOrderItem = ORDER_ITEMS;
ORDER_2.invoice = PAYMENT_2;

export const ORDER_3 = new Order();
ORDER_3.uuid = '3';
ORDER_3.number = 10003;
ORDER_3.state = OrderState.SHOPPING_CART;
ORDER_3.dateOrder = new Date();
ORDER_3.dateDelivery = new Date();
ORDER_3.listOrderItem = ORDER_ITEMS;

export const ORDERS: Array<Order> = [
  ORDER_1,
  ORDER_2,
];

export const SHOPPING_CART = new ShoppingCart();
SHOPPING_CART.uuid = '1';
SHOPPING_CART.listOrderItem = ORDER_ITEMS;

export const SHOP: Shop = new Shop();
SHOP.uuid = '1';
SHOP.uuid = 'Mein Shop [JSON]';
SHOP.uuid = 'In unserem Shop...';
SHOP.listShopItem = SHOP_ITEMS;

export const SHOP_ITEM: ShopItem = SHOP_ITEM_1;

export const DELIVERY_1 = new Delivery();
DELIVERY_1.uuid = '1';
DELIVERY_1.number = 1;
DELIVERY_1.state = 1;
DELIVERY_1.dateDelivery = new Date();
DELIVERY_1.order = ORDER_1;

export const DELIVERY_2 = new Delivery();
DELIVERY_2.uuid = '2';
DELIVERY_2.number = 2;
DELIVERY_2.state = 1;
DELIVERY_2.dateDelivery = new Date();
DELIVERY_2.order = ORDER_2;

export const DELIVERY_3 = new Delivery();
DELIVERY_3.uuid = '3';
DELIVERY_3.number = 3;
DELIVERY_3.state = 2;
DELIVERY_3.dateDelivery = new Date();
DELIVERY_3.order = ORDER_3;

export const DELIVERIES: Array<Delivery> = [
  DELIVERY_1,
  DELIVERY_2,
  DELIVERY_3,
];
