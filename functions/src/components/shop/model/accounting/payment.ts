import {DeliveryAddress} from "../order/delivery-address";
import {BillingAddress} from "./billing-address";
import {Amount} from "./amount";
import {PaymentState} from "./payment-state";
import {PaymentType} from "./payment-type";

export class Payment {
    public uuid!: string;
    public priceTotal!: Amount;
    public tax!: Amount;
    public type!: PaymentType;
    public state!: PaymentState;
    public dateCreated!: Date;
    public datePayment!: Date;
    public datePaymentDeadline!: Date;
    public billingAddress!: BillingAddress;
    public deliveryAddress!: DeliveryAddress;
}