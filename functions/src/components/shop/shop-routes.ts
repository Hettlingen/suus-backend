import {Request, Response} from "express";
import {ShopService} from "./services/shop-service";
import {Shop} from "./model/shop";
import {PaymentService} from "./services/payment-service";
import {Invoice} from "./model/accounting/invoice";
import {ShopItem} from "./model/shop-item";
import {AuthenticationService} from "../authentication/services/authentication-service";
import {Order} from "./model/order/order";

export class ShopRoutes {
    public static routes(app: any): void {

        app.route('/shops/:uuidShop').get(async (request: Request, response: Response) => {
            ShopService.getShop(request.params.uuidShop)
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

        app.route('/checkout').get(async (request: Request, response: Response) => {
            PaymentService.checkout(request.body)
                .then(function(payment: Invoice) {
                    response.status(200).send(payment);
                }).catch(function(error: any){
                response.status(404).send("Shop wasn't found: " + error)
            });
        })
    }
}