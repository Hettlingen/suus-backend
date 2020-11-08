import {Request, Response} from "express";
import {NewsletterService} from "./services/newsletter-service";
import {AuthenticationService} from "../../authentication/services/authentication-service";
import {NewsletterOrder} from "./model/newsletter-order";

export class NewsletterRoutes {
    public static routes(app: any): void {

        // Subscribe to Newsletter
        app.route('/newsletters').post(async (request: Request, response: Response) => {
            NewsletterService.subscribeNewsletter(request.body)
                .then(function (newsletterOrder: NewsletterOrder) {
                    response.status(200).send(newsletterOrder);
                }).catch(function (error: any) {
                response.status(404).send("Newsletter wasn't subscribed successfully: " + error);
            });
        });

        // Unsubscribe the newsletter
        app.route('/newsletters').delete(async (request: Request, response: Response) => {
            NewsletterService.unsubscribeNewsletter(request.body)
                .then(function (successful: boolean) {
                    response.status(200).send(successful);
                }).catch(function (error: any) {
                response.status(404).send("Newsletter wasn't unsubscribed successfully: " + error);
            });
        });

        // read a specific newsletter order
        app.route('/newsletters/:uuidNewsletter').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            NewsletterService.getNewsletter(request.params.uuidNewsletter)
                .then(function(newsletterOrder: NewsletterOrder) {
                    response.status(200).send(newsletterOrder);
                }).catch(function(error: any){
                response.status(404).send("Newsletter order isn't found: " + error)
            });
        })

        // read all newsletter order
        app.route('/newsletters').get(AuthenticationService.checkIfAuthenticated, async (request: Request, response: Response) => {
            NewsletterService.getOrdersOfNewsletter()
                .then(function(newsletterOrders: Array<NewsletterOrder>) {
                    response.status(200).send(newsletterOrders);
                }).catch(function(error: any){
                response.status(404).send("Newsletter orders weren't found: " + error)
            });
        })
    }
}
