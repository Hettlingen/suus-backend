import {ShopItemDatabase} from "./shop-item-database";

export class ShopDatabase {
    public uuid!: string;
    public name!: string;
    public description!: string;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public listShopItem: Array<ShopItemDatabase> = new Array<ShopItemDatabase>();
}
