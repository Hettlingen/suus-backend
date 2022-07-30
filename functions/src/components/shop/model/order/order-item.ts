import {ShopItem} from '../shop-item';

export class OrderItem {
  public uuid!: string;
  public quantity!: number;
  public shopItem!: ShopItem;
}
