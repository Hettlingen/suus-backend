import {Product} from "./product";

export class ShopItem {
    public uuid!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public currencyPrice!: string;
    public quantity!: number;
    public imageName!: string;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public datePublished!: Date;
    public product!: Product;
}