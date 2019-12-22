import {Product} from "./product";

export class ShopItem {
    public uuid: string;
    public price: number;
    public quantity: number;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public datePublished!: Date;
    public product: Product;

    constructor(uuid: string, product: Product, price: number, quantity: number) {
        this.uuid = uuid;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
    }
}