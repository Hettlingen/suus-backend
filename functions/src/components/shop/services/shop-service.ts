import {Shop} from "../model/shop";
import {ShopDatabaseService} from "./database/shop-database-service";
import {ShopItem} from "../model/shop-item";
import {Order} from "../model/order/order";
import {Delivery} from "../model/delivery/delivery";
import {v4 as uuidGenerator} from 'uuid';
import {GalleryService} from "../../content-management-system/gallery/services/gallery-service";
import {ShopItemDatabase} from "./database/model/shop-item-database";
import {mapShopDatabaseToShop, mapShopItemDatabaseToShopItem} from "../mapper/shop-mapper";
import {ImageService} from "../../workplace/services/image-service";
import {ShopDatabase} from "./database/model/shop-database";

export class ShopService {

    private static LIMIT_ROWS_TO_READ:number = 4;
    private static MAX_ROWS_TO_READ:number = 1000;

    /**
     * Read shop and the shop-items
     *
     * @param uuidShop
     * @param pageOnDatabase
     */
    static async getShop(uuidShop: string, pageOnDatabase: string): Promise<Shop> {
        console.log('START: ShopService.getShop: ' + uuidShop);
        if (!uuidShop) throw new Error('[ShopService.getShop] Shop-ID is required');

        if (pageOnDatabase) {
            const page: number = Number(pageOnDatabase);
            return this.getShopWithPaging(uuidShop, page);
        }

        return this.getShopWithoutPaging(uuidShop);
    }

    /**
     * Read shop with all shop-items
     *
     * @param uuidShop
     */
    private static async getShopWithoutPaging(uuidShop: string): Promise<Shop> {
        console.log('START: ShopService.getShopWithoutPaging: ' + uuidShop);
        if (!uuidShop) throw new Error('[ShopService.getShopWithoutPaging] Shop-ID is required');

        let shopDatabase: ShopDatabase;
        try {
            shopDatabase = await ShopDatabaseService.readShop(uuidShop, 0, this.MAX_ROWS_TO_READ);
        } catch(error){
            console.log('[ShopService.getShopWithoutPaging] Error reading Shop: ' + error);
            throw new Error('[ShopService.getShopWithoutPaging] Error reading Shop');
        }

        return mapShopDatabaseToShop(shopDatabase);
    }

    /**
     * Read shop-items with paging
     * @param uuidShop
     * @param pageOnDatabase
     */
    private static async getShopWithPaging(uuidShop: string, pageOnDatabase: number): Promise<Shop> {
        console.log('START: ShopService.getShopWithPaging: ' + uuidShop);
        if (!uuidShop) throw new Error('[ShopService.getShopWithPaging] Shop-ID is required');

        let offset = (pageOnDatabase - 1) * this.LIMIT_ROWS_TO_READ;

        let shopDatabase: ShopDatabase;
        try {
            shopDatabase =  await ShopDatabaseService.readShop(uuidShop, offset, this.LIMIT_ROWS_TO_READ);
        } catch(error){
            console.log('[ShopService.getShopWithPaging] Error reading Shop: ' + error);
            throw new Error('[ShopService.getShopWithPaging] Error reading Shop');
        }

        return mapShopDatabaseToShop(shopDatabase);
    }

    static async getShopItem(uuidShopItem: string): Promise<ShopItem> {
        console.log('START: ShopService.getShopItem: ' + uuidShopItem);
        if (!uuidShopItem) throw new Error('[ShopService.getShopItem] Shopitem-ID is required');

        let shopItem: ShopItem;
        let shopItemDatabase: ShopItemDatabase;
        try {
            shopItemDatabase = await ShopDatabaseService.readShopItem(uuidShopItem);
        } catch(error){
            throw new Error('[ShopService.getShopItem] Error reading Shopitem');
        }
        shopItem = mapShopItemDatabaseToShopItem(shopItemDatabase);

        if (shopItemDatabase.uuidGallery) {
            GalleryService.getGallery(shopItemDatabase.uuidGallery)
                .then(function (gallery) {
                    shopItem.gallery = gallery;
                }).catch(function (error) {
                console.error('Read of gallery went wrong');
            });
        }

        if (shopItemDatabase.uuidImageBanner) {
            ImageService.getImage(shopItemDatabase.uuidImageBanner)
                .then(function (image) {
                    shopItem.imageBanner = image;
                }).catch(function (error) {
                console.error('Read of image banner went wrong');
            });
        }

        if (shopItemDatabase.uuidImageProduct) {
            ImageService.getImage(shopItemDatabase.uuidImageProduct)
                .then(function (image) {
                    shopItem.imageProduct = image;
                }).catch(function (error) {
                console.error('Read of image product went wrong');
            });
        }

        console.log('Shopitem with images lautet: ' + JSON.stringify(shopItem));
        return shopItem;
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
            throw new Error('[ShopService.createOrder] Error create order of user: ' + order.uuidUserAccount);
        }
    }

    static async getOrders(uuidUserAccount: string): Promise<Array<Order>> {
        console.log('START: ShopService.getOrders: ' + JSON.stringify(uuidUserAccount));

        try {
            return await ShopDatabaseService.readOrders(uuidUserAccount);
        } catch(error){
            throw new Error('[ShopService.getOrders] Error reading Orders of user: ' + uuidUserAccount);
        }
    }

    static async getOrder(uuidOrder: string): Promise<Order> {
        console.log('START: ShopService.getOrder: ' + JSON.stringify(uuidOrder));

        try {
            return await ShopDatabaseService.readOrderByUuid(uuidOrder);
        } catch(error){
            throw new Error('[ShopService.getOrder] Error reading order with uuid: ' + uuidOrder);
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
            throw new Error('[ShopService.getDeliveries] Error reading deliveries of user: ' + uuidUserAccount);
        }
    }

    static async getDelivery(uuidDelivery: string): Promise<Delivery> {
        console.log('START: ShopService.getDelivery: ' + JSON.stringify(uuidDelivery));

        try {
            return await ShopDatabaseService.readDelivery(uuidDelivery);
        } catch(error){
            throw new Error('[ShopService.getDelivery] Error reading delivery with uuid: ' + uuidDelivery);
        }
    }
}
