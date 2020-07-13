import {Payment} from "../model/accounting/payment";

/**
 * See: https://medium.com/better-programming/payments-simplified-stripe-angular-express-4a88bf69f82e
 */
export class PaymentService {

    private static stripe = require('stripe')('sk_test_ijLDjyiCzl44BdJvBnNkGfEu00yIsYTPcQ');

    static async pay(payment: Payment): Promise<boolean> {
        console.log('START: PaymentService.pay');

        const token = payment.card.token;
        const amount = payment.invoice.priceTotal.value * 100;
        const currency = payment.invoice.priceTotal.currency;
        let charge;

        console.log('>>Token: ' + token + ' >>Amount: ' + amount);

        try {
            charge = await this.stripe.charges.create({
                amount,
                currency,
                source: token,
            });
            console.log('Zahlung erfolgreich: ' + JSON.stringify(charge));
        } catch(error){
            console.log(error);
            throw new Error('[myfarmer] PaymentService.pay - Error charging credit-card');
        }

        return true;
    }
}
