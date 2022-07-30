import {Request, Response} from "express";
import {ShopService} from "./services/shop-service";
import {Shop} from "./model/shop";
import {PaymentService} from "./services/payment-service";
import {ShopItem} from "./model/shop-item";
import {AuthenticationService} from "../identity-access-management/authentication/services/authentication-service";
import {Order} from "./model/order/order";
import {Delivery} from "./model/delivery/delivery";
import {RoleProducer} from "../identity-access-management/partner/model/roles/role-producer";
import {RoleDeliverer} from "../identity-access-management/partner/model/roles/role-deliverer";
import {RoleCustomer} from "../identity-access-management/partner/model/roles/role-customer";
import {ShopCustomerService} from "./services/shop-customer-service";
import {ShopProducerService} from "./services/shop-producer-service";
import {ShopDelivererService} from "./services/shop-deliverer-service";
import {ShoppingCart} from "./model/order/shopping-cart";

export class ShopRoutes {
    public static routes(app: any): void {

        // --------------------------------------------------
        // SHOP / SHOPITEM
        // --------------------------------------------------
        app.route('/shops/:uuidShop').get(async (request: Request, response: Response) => {
            ShopService.getShop(request.params.uuidShop, Number(request.query.pageOnDatabase))
                .then(function(shop: Shop) {
                    response.status(200).send(shop);
                }).catch(function(error: any){
                    response.status(404).send("Shop wasn't found: " + error)
            });
        })

        app.route('/shops/shopitem/:uuidShopItem').get(async (request: Request, response: Response) => {
            ShopService.getShopItem(request.params.uuidShopItem)
                .then(function(shopItem: ShopItem) {
                    response.status(200).send(shopItem);
                }).catch(function(error: any){
                response.status(404).send("Shopitem wasn't found: " + error)
            });
        })

        // --------------------------------------------------
        // SHOPPING CART
        // --------------------------------------------------

        // create shopping-cart
        app.route('/users/:uuidUserAccount/shopping-cart').post(async (request: Request, response: Response) => {
            ShopService.createShoppingCart(request.params.uuidUserAccount)
                .then(function(shoppingCart: ShoppingCart) {
                    response.status(200).send(shoppingCart);
                }).catch(function(error: any){
                response.status(404).send("Shopping-cart wasn't created: " + error)
            });
        })

        // update shopping-cart
        app.route('/users/:uuidUserAccount/shopping-cart').patch(async (request: Request, response: Response) => {
            ShopService.saveShoppingCart(request.params.uuidUserAccount, request.body)
                .then(function(shoppingCart: ShoppingCart) {
                    response.status(200).send(shoppingCart);
                }).catch(function(error: any){
                response.status(404).send("Shopping-cart wasn't updated: " + error)
            });
        })

        // get shopping-cart
        app.route('/users/:uuidUserAccount/shopping-cart').get(async (request: Request, response: Response) => {
            ShopService.getShoppingCart(request.params.uuidUserAccount)
                .then(function(shoppingCart: ShoppingCart) {
                    response.status(200).send(shoppingCart);
                }).catch(function(error: any){
                response.status(404).send("Shopping-cart wasn't found: " + error)
            });
        })

        // Delete a shopping-cart
        app.route('/users/:uuidUserAccount/shopping-cart').delete(async (request: Request, response: Response) => {
            ShopService.deleteShoppingCart(request.params.uuidUserAccount)
                .then(function (successful) {
                    response.status(200).send(successful);
                }).catch(function (error) {
                response.status(404).send("Shopping-cart wasn't deleted successful: " + error);
            });
        });

        // add order-item to shopping-cart
        app.route('/users/:uuidUserAccount/shopping-cart/order-item').post(async (request: Request, response: Response) => {
            ShopService.addOrderItemToShoppingCart(request.params.uuidUserAccount, request.body)
                .then(function(shoppingCart: ShoppingCart) {
                    response.status(200).send(shoppingCart);
                }).catch(function(error: any){
                response.status(404).send("Shopping-cart wasn't updated: " + error)
            });
        })

        // remove order-item from shopping-cart
        app.route('/users/:uuidUserAccount/shopping-cart/order-item').delete(async (request: Request, response: Response) => {
            ShopService.removeOrderItemFromShoppingCart(request.params.uuidUserAccount, request.body)
                .then(function(shoppingCart: ShoppingCart) {
                    response.status(200).send(shoppingCart);
                }).catch(function(error: any){
                response.status(404).send("Shopping-cart wasn't updated: " + error)
            });
        })

        // --------------------------------------------------
        // ORDERS
        // --------------------------------------------------
        app.route('/orders/user/:uuidUserAccount').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopService.getOrders(request.params.uuidUserAccount)
                .then(function(orders: Array<Order>) {
                    response.status(200).send(orders);
                }).catch(function(error: any){
                response.status(404).send("Orders weren't found: " + error)
            });
        })

        app.route('/orders/:uuidOrder').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopService.getOrder(request.params.uuidOrder)
                .then(function(order: Order) {
                    response.status(200).send(order);
                }).catch(function(error: any){
                response.status(404).send("Order isn't found: " + error)
            });
        })

        // --------------------------------------------------
        // CHECKOUT
        // --------------------------------------------------
        app.route('/checkout').post(async (request: Request, response: Response) => {
            PaymentService.pay(request.body)
                .then(function(successful: boolean) {
                    response.status(200).send(successful);
                }).catch(function(error: any){
                response.status(404).send("Payment wasn't executed: " + error)
            });
        })

        // --------------------------------------------------
        // DELIVERIES
        // --------------------------------------------------
        app.route('/deliveries/user/:uuidUserAccount').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopService.getDeliveries(request.params.uuidUserAccount)
                .then(function(deliveries: Array<Delivery>) {
                    response.status(200).send(deliveries);
                }).catch(function(error: any){
                response.status(404).send("Deliveries weren't found: " + error)
            });
        })

        app.route('/deliveries/:uuidDelivery').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopService.getDelivery(request.params.uuidDelivery)
                .then(function(delivery: Delivery) {
                    response.status(200).send(delivery);
                }).catch(function(error: any){
                response.status(404).send("Delivery isn't found: " + error)
            });
        })

        // --------------------------------------------------
        // CUSTOMERS
        // --------------------------------------------------

        app.route('/shop/customers/:uuidRoleCustomers').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopCustomerService.getCustomer(request.params.uuidRoleCustomers)
                .then(function(roleCustomer: RoleCustomer) {
                    response.status(200).send(roleCustomer);
                }).catch(function(error: any){
                response.status(404).send("Customer isn't found: " + error)
            });
        })

        app.route('/shop/customers').post(async (request: Request, response: Response) => {
            ShopCustomerService.updateCustomer(request.body)
                .then(function(roleCustomer: RoleCustomer) {
                    response.status(200).send(roleCustomer);
                }).catch(function(error: any){
                response.status(404).send("Customer isn't saved successfully: " + error)
            });
        })

        // --------------------------------------------------
        // PRODUCERS
        // --------------------------------------------------
        app.route('/shop/producers/:uuidRoleProducer').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopProducerService.getProducer(request.params.uuidRoleProducer)
                .then(function(roleProducer: RoleProducer) {
                    response.status(200).send(roleProducer);
                }).catch(function(error: any){
                response.status(404).send("Producer isn't found: " + error)
            });
        })

        app.route('/shop/producers').post(async (request: Request, response: Response) => {
            ShopProducerService.updateProducer(request.body)
                .then(function(roleProducer: RoleProducer) {
                    response.status(200).send(roleProducer);
                }).catch(function(error: any){
                response.status(404).send("Producer isn't saved successfully: " + error)
            });
        })

        // Get all producers within an area
        app.route('/shop/producers').get(async (request: Request, response: Response) => {
            ShopProducerService.getProducersWithinArea(Number(request.query.latitudeOfUserLocation), Number(request.query.longitudeOfUserLocation), Number(request.query.radiusOfProducerInKm))
                .then(function(producersNearUsersLoaction: RoleProducer[]) {
                    response.status(200).send(producersNearUsersLoaction);
                }).catch(function(error: any){
                response.status(404).send("Producers within area weren't found: " + error)
            });
        })

        // --------------------------------------------------
        // DELIVERERS
        // --------------------------------------------------

        app.route('/shop/deliverers/:uuidRoleDeliverer').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopDelivererService.getDeliverer(request.params.uuidRoleDeliverer)
                .then(function(roleDeliverer: RoleDeliverer) {
                    response.status(200).send(roleDeliverer);
                }).catch(function(error: any){
                response.status(404).send("Deliverer isn't found: " + error)
            });
        })

        app.route('/shop/deliverers').post(async (request: Request, response: Response) => {
            ShopDelivererService.updateDeliverer(request.body)
                .then(function(roleDeliverer: RoleDeliverer) {
                    response.status(200).send(roleDeliverer);
                }).catch(function(error: any){
                response.status(404).send("Deliverer isn't saved successfully: " + error)
            });
        })
    }
}
