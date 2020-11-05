import * as uuidGenerator from "uuid/v4";
import {NewsletterOrder} from "../model/newsletter-order";
import {NewsletterDatabseService} from "./database/newsletter-databse-service";
import * as nodemailer from 'nodemailer';

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

    static async sendNewslettersToUsers(): Promise<boolean> {
        const transporter = nodemailer.createTransport({
            host: "asmtp.mail.hostpoint.ch",
            port: 587, // unverschlüsselt oder verschlüsselt mit STARTTLS. Port 465 verschlüsselt mit SSL
            auth: {
                user: "martin.braun@scoop.ch",
                pass: "Hettlingen-3000"
            }
        });

        const mailOptions = {
            from: 'farmy@myfarmer.ch', //Adding sender's email
            to: 'sibylle_kunz@hotmail.com', //Recipient's email
            subject: 'Email Sent via Firebase', //Email subject
            html: '<b>Sending emails with Firebase is easy!</b>' //Email content in HTML
        };

        transporter.sendMail( mailOptions, (error, info) => {
            if (error) {
                console.log(`error: ${error}`);
            }
            console.log(`Message Sent ${info.response}`);
        });
        return true;
    }
}
