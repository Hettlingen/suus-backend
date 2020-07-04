import {ShopItem} from '../shop-item';
import {OfferItemState} from "./offer-item-state";

export class OfferItem {

  public uuid!: string;
  public number!: number;
  public quantity!: number;
  public state!: OfferItemState;
  public datePublish!: Date;
  public dateUnpublish!: Date;
  public dateCreated!: Date;
  public shopItem!: ShopItem;
}
