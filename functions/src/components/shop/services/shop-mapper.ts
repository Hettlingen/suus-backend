import {Shop} from "../model/shop";

export const mapShopFromDbToShop = (shopFromDb: any) => {
    const shop = new Shop();

    shop.uuid = shopFromDb.data.uuid;
    shop.name = shopFromDb.data.name;
    shop.description = shopFromDb.data.description;

    return shop;
}