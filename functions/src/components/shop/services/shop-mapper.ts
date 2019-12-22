import {Shop} from "../model/shop";

export const mapShopFromDbToShop = (shopFromDb: any) => {
    const shop = new Shop();

    // we use a blog for testing. remove this code as soon as we have a shop db
    shop.uuid = shopFromDb.data().uuid;
    shop.name = shopFromDb.data().title;

    // shop.uuid = shopFromDb.data().uuid;
    // shop.name = shopFromDb.data().name;
    // shop.description = shopFromDb.data().description;
    return shop;
}