import {Payment} from "../model/accounting/payment";

export class PaymentService {

    static async chargeCreditCard(payment: Payment): Promise<Payment> {
        console.log('START: CheckoutService.chargeCreditCard');

        // const token = payment.creditcard.token;
        // const amount = payment.invoice.priceTotal.value;
        // const currency = payment.invoice.priceTotal.currency;

        // Charge card
        // stripe.charges.create({
        //     amount,
        //     currency,
        //     description: 'Firebase Example',
        //     source: token,
        // }).then(charge => {
        //     // TODO Successful
        // }).catch(err => {
        //     // TODO Error
        // });

        return Promise.resolve(new Payment());
    }
}
