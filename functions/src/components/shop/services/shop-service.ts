import {Shop} from "../model/shop";
import {ShopDatabaseService} from "./database/shop-database-service";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order/order";
import {Delivery} from "../model/delivery/delivery";
import { v4 as uuidGenerator } from 'uuid';

export class ShopService {

    private static LIMIT_ROWS_TO_READ = 3;

    static async getShop(uuidShop: string, pageOnDatabase: number): Promise<Shop> {
        console.log('START: ShopService.getShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        const offset = (pageOnDatabase - 1) * this.LIMIT_ROWS_TO_READ;

        try {
            return await ShopDatabaseService.readShop(uuidShop, offset, this.LIMIT_ROWS_TO_READ);
        } catch(error){
            console.log('[myfarmer] ShopService.getShop - Error reading Shop: ' + error);
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

    /**************************************************/
    /* ORDERS                                         */
    /**************************************************/
    static async createOrder(order: Order): Promise<Order> {
        console.log('START: ShopService.createOrder: ' + order.uuidUserAccount);
        order.uuid = uuidGenerator();

        try {
            return await ShopDatabaseService.createOrder(order);
        } catch(error){
            throw new Error('ShopService.createOrders - Error create order of user: ' + order.uuidUserAccount);
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
            return await ShopDatabaseService.readOrderByUuid(uuidOrder);
        } catch(error){
            throw new Error('[myfarmer] ShopService.getOrder - Error reading order with uuid: ' + uuidOrder);
        }
    }

    /**************************************************/
    /* DELIVERIES                                     */
    /**************************************************/
    static async createDelivery(delivery: Delivery): Promise<Delivery> {
        return new Delivery();
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
