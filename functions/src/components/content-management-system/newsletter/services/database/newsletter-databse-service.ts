import {databaseConnectionPool} from "../../../../../index";
import {NewsletterOrder} from "../../model/newsletter-order";
import {
    mapNewsletterOrderFromDbToNewsletterOrder,
    mapNewsletterOrdersFromDbToNewsletterOrders
} from "../../mapper/newsletter-mapper";

export class NewsletterDatabseService {

    static async createNewsletterOrder(uuid: string, newsletterOrder: NewsletterOrder): Promise<NewsletterOrder> {
        console.log('START: NewsletterDatabseService.createNewsletter');
        const infoForCustomer = newsletterOrder.infoForCustomer === true ? 1 : 0;
        const infoForProducer = newsletterOrder.infoForProducer === true ? 1 : 0;
        const infoForDeliverer = newsletterOrder.infoForDeliverer === true ? 1 : 0;

        const query = `INSERT INTO NewsletterOrder(uuid, email, infoForCustomer, infoForProducer, infoForDeliverer) VALUES ('${uuid}', '${newsletterOrder.email}', ${infoForCustomer}, ${infoForProducer}, ${infoForDeliverer})`;

        try {
            const uuidFromDb = await databaseConnectionPool.query(query);

            if (!uuidFromDb) throw new Error('[myfarmer] Error create newsletter-order in database.');

            return uuidFromDb[0];
        } catch(error) {
            console.log('Fehler SQL: ' + error);
            throw new Error('[myfarmer] Error execute insert-query newsletter-order: ' + error);
        }
    }

    static async deleteNewsletterOrder(email: string): Promise<boolean> {
        console.log('START: NewsletterDatabseService.deleteNewsletter');

        const query = `DELETE FROM NewsletterOrder WHERE email = '${email}'`;

        try {
            await databaseConnectionPool.query(query);
            return true;
        } catch(error) {
            throw new Error('[myfarmer] Error execute delete newsletter: ' + error);
        }
    }

    static async readNewsletterOrder(uuidRoleUser: string): Promise<NewsletterOrder> {
        console.log('START: NewsletterDatabseService.readNewsletter: ' + JSON.stringify(uuidRoleUser));
        if (!uuidRoleUser) throw new Error('[myfarmer] NewsletterDatabseService.readNewsletter - Wrong parameters');

        const query = `SELECT NewsletterOrder.uuid,
                              NewsletterOrder.email,
                              NewsletterOrder.infoForCustomer,
                              NewsletterOrder.infoForProducer,
                              NewsletterOrder.infoForDeliverer
                            FROM NewsletterOrder
                            WHERE NewsletterOrder.uuidRoleUser='${uuidRoleUser}';`;

        try {
            const newsletterOrderFromDb = await databaseConnectionPool.query(query);

            if (newsletterOrderFromDb === null || newsletterOrderFromDb === undefined) {
                throw new Error('[myfarmer] NewsletterDatabseService.readNewsletter - Newsletter-order doesnt exist on database');
            }

            return mapNewsletterOrderFromDbToNewsletterOrder(newsletterOrderFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] NewsletterDatabseService.readNewsletter - Error reading newsletter-order from database: ' + error);
        }
    }

    static async readNewsletterOrders(): Promise<Array<NewsletterOrder>> {
        console.log('START: NewsletterDatabseService.readNewsletters');

        const query = 'SELECT * FROM NewsletterOrder;';

        try {
            const newsletterOrdersFromDb = await databaseConnectionPool.query(query);

            if (newsletterOrdersFromDb === null || newsletterOrdersFromDb === undefined) {
                throw new Error('[myfarmer] NewsletterDatabseService.readNewsletters - Newsletter-orders dont exist on database');
            }

            return mapNewsletterOrdersFromDbToNewsletterOrders(newsletterOrdersFromDb);
        } catch(error) {
            console.log('[myfarmer] NewsletterDatabseService.readNewsletters - Error reading newsletter-orders from database: ' + error);
            throw new Error('[myfarmer] NewsletterDatabseService.readNewsletters - Error reading newsletter-orders from database: ' + error);
        }
    }
}
