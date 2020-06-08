import {OrderItem} from './order-item';
import {Payment} from './accounting/payment';
import {DeliveryAddress} from './delivery-address';
import {OrderState} from '../utils/codes/OrderState';

export class Order {
  public uuid!: string;
  public uuidUserAccount!: string;
  public number!: number;
  public state!: OrderState;
  public dateOrder!: Date;
  public dateDelivery!: Date;
  public listOrderItem!: Array<OrderItem>;
  public deliveryAddress!: DeliveryAddress;
  public payment!: Payment;
}
