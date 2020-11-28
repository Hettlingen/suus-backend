import {Amount} from "./amount";
import {Address} from "../../../identity-access-management/partner/model/address";
import {InvoiceType} from "./invoice-type";
import {InvoiceState} from "./invoice-state";

export class Invoice {
    public uuid!: string;
    public priceTotal!: Amount;
    public tax!: Amount;
    public type!: InvoiceType;
    public state!: InvoiceState;
    public dateCreated!: Date;
    public dateInvoice!: Date;
    public dateinvoiceDeadline!: Date;
    public datePaymentDeadline!: Date;
    public billingAddress!: Address;
}
