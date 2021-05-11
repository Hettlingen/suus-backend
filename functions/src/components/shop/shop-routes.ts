import {Request, Response} from "express";
import {ShopService} from "./services/shop-service";
import {Shop} from "./model/shop";
import {PaymentService} from "./services/payment-service";
import {ShopItem} from "./model/shop-item";
import {AuthenticationService} from "../identity-access-management/authentication/services/authentication-service";
import {Order} from "./model/order/order";
import {OfferItem} from "./model/offer/offer-item";
import {Delivery} from "./model/delivery/delivery";
import {ShopAdministrationService} from "./services/shop-administration-service";
import {RoleProducer} from "../identity-access-management/partner/model/roles/role-producer";
import {RoleDeliverer} from "../identity-access-management/partner/model/roles/role-deliverer";
import {RoleCustomer} from "../identity-access-management/partner/model/roles/role-customer";

export class ShopRoutes {
    public static routes(app: any): void {

        app.route('/shops/:uuidShop').get(async (request: Request, response: Response) => {
            ShopService.getShop(request.params.uuidShop, request.query.pageOnDatabase)
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

        app.route('/checkout').post(async (request: Request, response: Response) => {
            PaymentService.pay(request.body)
                .then(function(successful: boolean) {
                    response.status(200).send(successful);
                }).catch(function(error: any){
                response.status(404).send("Payment wasn't executed: " + error)
            });
        })

        app.route('/offer-items/user/:uuidUserAccount').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopService.getOfferItems(request.params.uuidUserAccount)
                .then(function(offerItems: Array<OfferItem>) {
                    response.status(200).send(offerItems);
                }).catch(function(error: any){
                response.status(404).send("Offer-items weren't found: " + error)
            });
        })

        app.route('/offer-items/:uuidOffer').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopService.getOfferItem(request.params.uuidOffer)
                .then(function(offerItem: OfferItem) {
                    response.status(200).send(offerItem);
                }).catch(function(error: any){
                response.status(404).send("Offer-item isn't found: " + error)
            });
        })

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
        // SHOP ADMINISTRATION
        // --------------------------------------------------

        // Get Customer
        app.route('/shop/customers/:uuidRoleCustomers').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopAdministrationService.getCustomer(request.params.uuidRoleCustomers)
                .then(function(roleCustomer: RoleCustomer) {
                    response.status(200).send(roleCustomer);
                }).catch(function(error: any){
                response.status(404).send("Customer isn't found: " + error)
            });
        })

        // Update Producer
        app.route('/shop/customers').post(async (request: Request, response: Response) => {
            ShopAdministrationService.updateCustomer(request.body)
                .then(function(roleCustomer: RoleCustomer) {
                    response.status(200).send(roleCustomer);
                }).catch(function(error: any){
                response.status(404).send("Customer isn't saved successfully: " + error)
            });
        })

        // Get Producer
        app.route('/shop/producers/:uuidRoleProducer').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopAdministrationService.getProducer(request.params.uuidRoleProducer)
                .then(function(roleProducer: RoleProducer) {
                    response.status(200).send(roleProducer);
                }).catch(function(error: any){
                response.status(404).send("Producer isn't found: " + error)
            });
        })

        // Update Producer
        app.route('/shop/producers').post(async (request: Request, response: Response) => {
            ShopAdministrationService.updateProducer(request.body)
                .then(function(roleProducer: RoleProducer) {
                    response.status(200).send(roleProducer);
                }).catch(function(error: any){
                response.status(404).send("Producer isn't saved successfully: " + error)
            });
        })

        // Get Deliverer
        app.route('/shop/deliverers/:uuidRoleDeliverer').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            ShopAdministrationService.getDeliverer(request.params.uuidRoleDeliverer)
                .then(function(roleDeliverer: RoleDeliverer) {
                    response.status(200).send(roleDeliverer);
                }).catch(function(error: any){
                response.status(404).send("Deliverer isn't found: " + error)
            });
        })

        // Update Deliverer
        app.route('/shop/deliverers').post(async (request: Request, response: Response) => {
            ShopAdministrationService.updateDeliverer(request.body)
                .then(function(roleDeliverer: RoleDeliverer) {
                    response.status(200).send(roleDeliverer);
                }).catch(function(error: any){
                response.status(404).send("Deliverer isn't saved successfully: " + error)
            });
        })
    }
}
