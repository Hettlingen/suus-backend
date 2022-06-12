import {OrderItem} from './order-item';
import {OrderState} from "./order-state";

export class ShoppingCart {
  public uuid!: string;
  public uuidUserAccount!: string;
  public state!: OrderState;
  public listOrderItem!: Array<OrderItem>;
}
