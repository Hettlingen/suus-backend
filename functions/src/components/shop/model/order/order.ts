import {OrderItem} from './order-item';
import {Invoice} from '../accounting/invoice';
import {OrderState} from "./order-state";
import {Address} from "../../../identity-access-management/partner/model/address";

export class Order {
  public uuid!: string;
  public uuidUserAccount!: string;
  public number!: number;
  public state!: OrderState;
  public dateOrder!: Date;
  public dateDelivery!: Date;
  public dateCreated!: Date;
  public listOrderItem!: Array<OrderItem>;
  public deliveryAddress!: Address;
  public invoice!: Invoice;
}
