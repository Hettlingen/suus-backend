import {Request, Response} from "express";
import {ShopService} from "./services/shop-service";
import {Product} from "./model/product";

export class ShopRoutes {
    public static routes(app: any): void {

        app.route('/shops/:uuidShop').get(async (request: Request, response: Response) => {
            ShopService.getShop(request.params.uuidShop)
                .then(function(product: Product) {
                    response.status(200).send(product);
                }).catch(function(error: any){
                response.status(404).send("Product wasn't found: " + error)
            });
        })
    }
}