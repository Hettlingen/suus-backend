import {ShopDatabaseService} from "./database/shop-database-service";
import {ShoppingCart} from "../model/order/shopping-cart";
import {OrderItem} from "../model/order/order-item";
import { v4 as uuidGenerator } from 'uuid';

export class ShoppingCartService {

    static async createShoppingCart(uuidUserAccount: string): Promise<ShoppingCart> {
        console.log('START: ShopService.createShoppingCart: ' + uuidUserAccount);

        let shoppingCart: ShoppingCart = new ShoppingCart();
        shoppingCart.uuid = uuidGenerator();
        shoppingCart.dateCreated = new Date();

        try {
            return await ShopDatabaseService.createShoppingCart(shoppingCart);
        } catch(error){
            throw new Error('ShopService.createShoppingCart - Error create shopping-cart of user: ' + uuidUserAccount);
        }
    }

    static async saveShoppingCart(uuidUserAccount: string, shoppingCart: ShoppingCart): Promise<ShoppingCart> {
        console.log('START: ShopService.createShoppingCart: ' + uuidUserAccount);

        shoppingCart.uuid = uuidGenerator();

        try {
            return await ShopDatabaseService.saveShoppingCart(shoppingCart);
        } catch(error){
            throw new Error('ShopService.createShoppingCart - Error create shopping-cart of user: ' + uuidUserAccount);
        }
    }

    static async getShoppingCart(uuidUserAccount: string): Promise<ShoppingCart> {
        console.log('START: ShopService.getShoppingCart: ' + uuidUserAccount);

        try {
            return await ShopDatabaseService.readShoppingCartByUuidUserAccount(uuidUserAccount);
        } catch(error){
            throw new Error('ShopService.getShoppingCart - Error reading Orders of user: ' + uuidUserAccount);
        }
    }

    static async addOrderItemToShoppingCart(uuidUserAccount: string, orderItem: OrderItem): Promise<ShoppingCart> {
        let shoppingCart: ShoppingCart = await this.getShoppingCart(uuidUserAccount);

        if (shoppingCart == null) {
            this.createShoppingCart(uuidUserAccount)
                .then(function (shoppingCartFromDb) {
                    shoppingCart = shoppingCartFromDb;
                }).catch(function (error) {
                console.log('Shoppingcart not created');
                throw error;
            });
        }

        // TODO check if this kind of order-item already exist in shopping-cart
        if (shoppingCart.hasOrderItem(orderItem)) {
            const orderItemOfShppingCart = shoppingCart.getOrderItem(orderItem);
            orderItemOfShppingCart!.quantity = orderItemOfShppingCart!.quantity + orderItem.quantity;
        } else {
            // TODO in case there is no order-item in the shopping-cart, create a new one

        }

        return new ShoppingCart();
    }

    static async removeOrderItemFromShoppingCart(uuidUserAccount: string, orderItem: OrderItem): Promise<ShoppingCart> {
        let shoppingCart: ShoppingCart = await this.getShoppingCart(uuidUserAccount);

        if (shoppingCart === null) {
            shoppingCart = new ShoppingCart();
            shoppingCart.uuid = uuidGenerator();
            try {
                shoppingCart = await ShopDatabaseService.saveShoppingCart(shoppingCart);
            } catch(error){
                throw new Error('ShopService.createShoppingCart - Error create shopping-cart of user: ' + uuidUserAccount);
            }
        }

        // TODO remove order-item
        return new ShoppingCart();
    }

    static async deleteShoppingCart(uuidUserAccount: string): Promise<boolean> {
        console.log('START: BlogService.deletePost: ' + uuidUserAccount);

        try {
            // return await BlogDatabseService.deletePost(uuidPost);
            return true;
        } catch(error){
            throw new Error('ShopService.deleteShoppingCart - Error deleting shopping-cart with user-account-uuid: '
                + uuidUserAccount + ', error: '
                + error);
        }
    }
}
