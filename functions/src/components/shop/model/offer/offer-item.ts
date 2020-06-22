import {ShopItem} from '../shop-item';
import {OfferItemState} from "./offer-item-state";

export class OfferItem {

  public uuid!: string;
  public quantity!: number;
  public state!: OfferItemState;
  public shopItem!: ShopItem;
}
