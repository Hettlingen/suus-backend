import {DeliveryAddress} from "./DeliveryAddress";
import {BillingAddress} from "./BillingAddress";

export class Payment {
    public uuid!: string;
    public amount!: number;
    public currency!: string;
    public state!: number;
    public dateCreated!: Date;
    public deliveryAddress!: DeliveryAddress;
    public billingAddress!: BillingAddress;
}