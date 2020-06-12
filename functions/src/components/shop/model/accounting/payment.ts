import {DeliveryAddress} from "../order/delivery-address";
import {BillingAddress} from "./billing-address";
import {Amount} from "./amount";
import {PaymentState} from "./payment-state";

export class Payment {
    public uuid!: string;
    public priceTotal!: Amount;
    public tax!: Amount;
    public state!: PaymentState;
    public dateCreated!: Date;
    public datePayment!: Date;
    public billingAddress!: BillingAddress;
    public deliveryAddress!: DeliveryAddress;
}