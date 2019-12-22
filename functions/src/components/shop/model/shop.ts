import {ShopItem} from "./shop-item";

export class Shop {
    public uuid!: string;
    public name!: string;
    public description!: string;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public listShopItem!: Array<ShopItem>;
}