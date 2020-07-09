import {Payment} from "../model/accounting/payment";

export class PaymentService {

    private static stripe = require('stripe')('sk_test_ijLDjyiCzl44BdJvBnNkGfEu00yIsYTPcQ');
    private static charge: any;

    static async pay(payment: Payment): Promise<boolean> {
        console.log('START: CheckoutService.pay');

        const token = payment.card.token;
        const amount = payment.invoice.priceTotal.value * 100;
        const currency = payment.invoice.priceTotal.currency;

        try {
            this.charge = await this.stripe.charges.create({
                amount,
                currency,
                source: token,
                capture: false,
            });
        } catch(error){
            throw new Error('[myfarmer] ShopService.getShopItem - Error reading Shopitem');
        }

        try {
            await this.makePayment(this.charge);
        } catch(error) {
            this.refundPayment(this.charge);
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    }

    static makePayment(charge: any) {
        try {
            this.stripe.charges.capture(charge.id)
        } catch(error) {
            throw error;
        }
    }

    static refundPayment(charge: any) {
        try {
            this.stripe.refunds.create({charge: charge.id});
        } catch(error) {

        }
    }
}
