import {Amount} from "./amount";
import {PaymentState} from "./payment-state";
import {PaymentType} from "./payment-type";
import {Address} from "../../../community/partner/model/address";

export class Payment {
    public uuid!: string;
    public priceTotal!: Amount;
    public tax!: Amount;
    public type!: PaymentType;
    public state!: PaymentState;
    public dateCreated!: Date;
    public datePayment!: Date;
    public datePaymentDeadline!: Date;
    public billingAddress!: Address;
}