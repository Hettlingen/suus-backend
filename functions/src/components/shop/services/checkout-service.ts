import {Payment} from "../model/accounting/payment";

export class CheckoutService {

    static async checkout(payment: Payment): Promise<Payment> {
        console.log('START: CheckoutService.checkout');
        return Promise.resolve(new Payment());
    }
}