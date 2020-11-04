import * as uuidGenerator from "uuid/v4";
import {NewsletterOrder} from "../model/newsletter-order";
import {NewsletterDatabseService} from "./database/newsletter-databse-service";

export class NewsletterService {

    static async subscribeNewsletter(newsletterOrder: NewsletterOrder): Promise<NewsletterOrder> {
        console.log('START: NewsletterService.createPost');

        try {
            return await NewsletterDatabseService.createNewsletterOrder(
                uuidGenerator(),
                newsletterOrder);
        } catch(error){
            throw new Error('[myfarmer] NewsletterService.subscribeNewsletter - Error subscribe NewsletterOrder: '
                + newsletterOrder.email + ', error: ' +
                + error);
        }
    }

    static async unsubscribeNewsletter(newsletterOrder: NewsletterOrder): Promise<boolean> {
        console.log('START: NewsletterService.unsubscribeNewsletter: ' + newsletterOrder.email);

        // TODO Fall email geliefert kann dies als Parameter verwendet werden. Ansonsten muss noch die NewsletterOrder gelesen werden

        try {
            return await NewsletterDatabseService.deleteNewsletterOrder(newsletterOrder.email);
        } catch(error){
            throw new Error('[myfarmer] NewsletterService.unsubscribeNewsletter - Error unsubscribe NewsletterOrder vor user: '
                + newsletterOrder.email + ', error: ' +
                + error);
        }
    }

    static async getNewsletter(uuidRoleUser: string): Promise<NewsletterOrder> {
        console.log('START: NewsletterService.getNewsletter: ' + JSON.stringify(uuidRoleUser));

        try {
            return await NewsletterDatabseService.readNewsletterOrder(uuidRoleUser);
        } catch(error){
            throw new Error('[myfarmer] NewsletterService.getNewsletter - Error reading Newsletter: ' + uuidRoleUser);
        }
    }

    static async getOrdersOfNewsletter(): Promise<Array<NewsletterOrder>> {
        console.log('START: NewsletterService.getOrdersOfNewsletter');

        try {
            return await NewsletterDatabseService.readNewsletterOrders();
        } catch(error){
            throw new Error('[myfarmer] NewsletterService.getOrdersOfNewsletter - Error reading all Newsletter');
        }
    }
}
