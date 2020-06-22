import {DeliveryState} from "./delivery-state";
import {Order} from "../order/order";

export class Delivery {
  public uuid!: string;
  public uuidUserAccount!: string;
  public number!: number;
  public state!: DeliveryState;
  public dateDelivery!: Date;
  public order!: Order;
}
