import {Payment} from "../model/accounting/Payment";

export class PaymentService {

    static async checkout(payment: Payment): Promise<Payment> {
        console.log('START: CheckoutService.checkout');

        // stripe.charges.create(
        //     {
        //         amount: 2000,
        //         currency: 'chf',
        //         source: 'tok_visa',
        //         description: 'My First Test Charge (created for API docs)',
        //     },
        //     function(err: any, charge: Charge) {
        //         // asynchronously called
        //     }
        // );
        return Promise.resolve(new Payment());
    }
}