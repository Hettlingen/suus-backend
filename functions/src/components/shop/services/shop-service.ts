import {Shop} from "../model/shop";
import {ShopDatabaseService} from "./database/shop-database-service";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order";
import {OrderState} from "../utils/codes/OrderState";

export class ShopService {

    static async getShop(uuidShop: string): Promise<Shop> {
        console.log('START: ShopService.getShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[myfarmer] Shop-ID is required');

        try {
            return await ShopDatabaseService.readShop(uuidShop);
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
            throw new Error('[myfarmer] ShopService.getOrder - Error reading Orders of user: ' + uuidOrder);
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
}