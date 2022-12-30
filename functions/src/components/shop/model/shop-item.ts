import {Gallery} from "../../content-management-system/gallery/model/gallery";
import {Image} from "../../content-management-system/gallery/model/image";

export class ShopItem {
    public uuid!: string;
    public name!: string;
    public description!: string;
    public slogan!: string;
    public category!: number;
    public brand!: string;
    public unit!: string;
    public price!: number;
    public currencyPrice!: string;
    public quantity!: number;
    public uuidImageBanner!: string;
    public uuidImageProduct!: string;
    public imageBanner!: Image;
    public imageProduct!: Image;
    public gallery!: Gallery;
    public imageName!: string;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public datePublished!: Date;
}
