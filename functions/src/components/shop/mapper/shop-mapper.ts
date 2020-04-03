import {Shop} from "../model/shop";
import {ShopItem} from "../model/shop-item";

export const mapShopFromDbToShop = (shopFromDb: any) => {
    const shop = new Shop();

    shop.uuid = shopFromDb[0].uuid;
    shop.name = shopFromDb[0].name;
    shop.description = shopFromDb[0].description;

    for (let row of shopFromDb) {
        let shopItem = new ShopItem();
        shopItem.uuid = row.uuidOfShopItem;
        shopItem.name = row.nameOfShopItem;
        shopItem.description = row.descriptionOfShopItem;
        shopItem.price = row.priceOfShopItem;
        shopItem.currencyPrice = row.currencyPriceOfShopItem;
        shopItem.imageName = row.imageNameOfShopItem;
        shop.listShopItem.push(shopItem);
    }

    return shop;
}

export const mapShopItemFromDbToShopItem = (shopItemFromDb: any) => {
    const shopItem = new ShopItem();

    shopItem.uuid = shopItemFromDb.uuid;
    shopItem.name = shopItemFromDb.name;
    shopItem.description = shopItemFromDb.description;
    shopItem.price = shopItemFromDb.price;
    shopItem.currencyPrice = shopItemFromDb.currencyPrice;
    shopItem.imageName = shopItemFromDb.imageName;

    return shopItem;
}