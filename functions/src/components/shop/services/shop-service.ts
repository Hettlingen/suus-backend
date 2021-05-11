import {Shop} from "../model/shop";
import {ShopDatabaseService} from "./database/shop-database-service";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order/order";
import {OrderState} from "../model/order/order-state";
import {Delivery} from "../model/delivery/delivery";
import {OfferItem} from "../model/offer/offer-item";

export class ShopService {

    private static LIMIT_ROWS_TO_READ = 3;

    static async getShop(uuidShop: string, pageOnDatabase: number): Promise<Shop> {
        console.log('START: ShopService.getShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        const offset = (pageOnDatabase - 1) * this.LIMIT_ROWS_TO_READ;

        try {
            return await ShopDatabaseService.readShop(uuidShop, offset, this.LIMIT_ROWS_TO_READ);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getShop - Error reading Shop');
        }
    }

    static async getShopItem(uuidShopItem: string): Promise<ShopItem> {
        console.log('START: ShopService.getShopItem: ' + uuidShopItem);
        if (!uuidShopItem) throw new Error('[myfarmer] Shopitem-ID is required');

        try {
            return await ShopDatabaseService.readShopItem(uuidShopItem);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getShopItem - Error reading Shopitem');
        }
    }

    static async getOrders(uuidUserAccount: string): Promise<Array<Order>> {
        console.log('START: ShopService.getOrders: ' + JSON.stringify(uuidUserAccount));

        try {
            return await ShopDatabaseService.readOrders(uuidUserAccount);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getOrders - Error reading Orders of user: ' + uuidUserAccount);
        }
    }

    static async getOrder(uuidOrder: string): Promise<Order> {
        console.log('START: ShopService.getOrder: ' + JSON.stringify(uuidOrder));

        try {
            return await ShopDatabaseService.readOrder(uuidOrder);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getOrder - Error reading order with uuid: ' + uuidOrder);
        }
    }

    static async getShoppingCart(uuidUserAccount: string): Promise<Order> {
        console.log('START: ShopService.getShoppingCart: ' + JSON.stringify(uuidUserAccount));

        try {
            return await ShopDatabaseService.readOrderByUserAccountUuidAndState(uuidUserAccount, OrderState.SHOPPING_CART);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getShoppingCart - Error reading Orders of user: ' + uuidUserAccount);
        }
    }

    static async getOfferItems(uuidUserAccount: string): Promise<Array<OfferItem>> {
        console.log('START: ShopService.getOfferItems: ' + JSON.stringify(uuidUserAccount));

        try {
            return await ShopDatabaseService.readOfferItems(uuidUserAccount);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getOfferItems - Error reading offer-items of user: ' + uuidUserAccount);
        }
    }

    static async getOfferItem(uuidOfferItem: string): Promise<OfferItem> {
        console.log('START: ShopService.getOfferItem: ' + JSON.stringify(uuidOfferItem));

        try {
            return await ShopDatabaseService.readOfferItem(uuidOfferItem);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getOfferItem - Error reading offer-item with uuid: ' + uuidOfferItem);
        }
    }
    static async getDeliveries(uuidUserAccount: string): Promise<Array<Delivery>> {
        console.log('START: ShopService.getDeliveries: ' + JSON.stringify(uuidUserAccount));

        try {
            return await ShopDatabaseService.readDeliveries(uuidUserAccount);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getDeliveries - Error reading deliveries of user: ' + uuidUserAccount);
        }
    }

    static async getDelivery(uuidDelivery: string): Promise<Delivery> {
        console.log('START: ShopService.getDelivery: ' + JSON.stringify(uuidDelivery));

        try {
            return await ShopDatabaseService.readDelivery(uuidDelivery);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getDelivery - Error reading delivery with uuid: ' + uuidDelivery);
        }
    }
}
