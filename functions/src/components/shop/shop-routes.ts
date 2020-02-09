import {Request, Response} from "express";
import {ShopService} from "./services/shop-service";
import {Shop} from "./model/shop";
import {CheckoutService} from "./services/checkout-service";
import {Payment} from "./model/accounting/payment";

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

        app.route('/checkout').get(async (request: Request, response: Response) => {
            CheckoutService.checkout(request.body)
                .then(function(payment: Payment) {
                    response.status(200).send(payment);
                }).catch(function(error: any){
                response.status(404).send("Shop wasn't found: " + error)
            });
        })
    }
}