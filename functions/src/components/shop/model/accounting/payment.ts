import {DeliveryAddress} from "./delivery-address";
import {BillingAddress} from "./billing-address";

export class Payment {
    public uuid!: string;
    public amount!: number;
    public currency!: string;
    public paid!: boolean;
    public dateCreated!: Date;
    public deliveryAddress!: DeliveryAddress;
    public billingAddress!: BillingAddress;
}