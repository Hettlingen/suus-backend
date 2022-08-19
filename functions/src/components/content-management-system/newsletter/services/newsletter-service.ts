import { v4 as uuidGenerator } from 'uuid';
import {NewsletterOrder} from "../model/newsletter-order";
import {NewsletterDatabseService} from "./database/newsletter-databse-service";
import * as nodemailer from 'nodemailer';

export class NewsletterService {

    static async subscribeNewsletter(newsletterOrder: NewsletterOrder): Promise<NewsletterOrder> {
        console.log('START: NewsletterService.subscribeNewsletter');

        // TODO check if there is already the same email in the database

        let newsletterOrderCreated;

        try {
            newsletterOrderCreated = await NewsletterDatabseService.createNewsletterOrder(
                uuidGenerator(),
                newsletterOrder);
        } catch(error){
            throw new Error('[myfarmer] NewsletterService.subscribeNewsletter - Error subscribe NewsletterOrder: '
                + newsletterOrder.email + ', error: '
                + error);
        }

        try {
            await this.sendNewslettersToUsers(newsletterOrder);
        } catch(error) {
            console.log('Fehler beim Mailversand: ' + error);
            throw error;
        }

        return newsletterOrderCreated;
    }

    static async unsubscribeNewsletter(newsletterOrder: NewsletterOrder): Promise<boolean> {
        console.log('START: NewsletterService.unsubscribeNewsletter: ' + newsletterOrder.email);

        // TODO Fall email geliefert kann dies als Parameter verwendet werden. Ansonsten muss noch die NewsletterOrder gelesen werden

        try {
            return await NewsletterDatabseService.deleteNewsletterOrder(newsletterOrder.email);
        } catch(error){
            throw new Error('[myfarmer] NewsletterService.unsubscribeNewsletter - Error unsubscribe NewsletterOrder vor user: '
                + newsletterOrder.email + ', error: '
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

    static async sendNewslettersToUsers(newsletterOrder: NewsletterOrder): Promise<boolean> {
        const userNameMailServer = process.env.MAIL_SERVER_USER_NAME;
        const passwordMailServer = process.env.MAIL_SERVER_PASSWORD;

        console.log('Benutzername: ' + userNameMailServer);

        const transporter = nodemailer.createTransport({
            host: "asmtp.mail.hostpoint.ch",
            port: 587, // unverschlüsselt oder verschlüsselt mit STARTTLS. Port 465 verschlüsselt mit SSL
            secure: false, // STARTTLS
            auth: {
                user: userNameMailServer,
                pass: passwordMailServer
            }
        });

        console.log('Nodemailer Transporter: ' + transporter);

        transporter.verify(function(error, success) {
            if (error) {
                console.log('Verify Mail Connection Error: ' + error);
            } else {
                console.log("Mail Server is ready to take our messages");
            }
        });

        const mailOptions = {
            from: 'martin.braun@scoop.ch', //Adding sender's email
            to: 'martinbraun@scoop.ch', //Recipient's email
            subject: 'myFarmer - Testmail', //Email subject
            html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
        };

        transporter.sendMail( mailOptions, (error, info) => {
            if (error) {
                throw new Error('[myfarmer] NewsletterService.sendNewslettersToUsers - Error send email vor user: '
                    + newsletterOrder.email + ', error: ' +
                    + error);
            }
            console.log(`Message/Mail sent ${info.response}`);
        });
        return true;
    }
}
