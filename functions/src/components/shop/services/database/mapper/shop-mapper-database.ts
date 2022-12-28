import {ShopItemDatabase} from "../model/shop-item-database";
import {ShopDatabase} from "../model/shop-database";

export const mapShopFromDbToShopDatabase = (shopFromDb: any) => {
    const shopDatabase = new ShopDatabase();

    shopDatabase.uuid = shopFromDb[0].uuid;
    shopDatabase.name = shopFromDb[0].name;
    shopDatabase.description = shopFromDb[0].description;

    for (const row of shopFromDb) {
        const shopItemDatabase = new ShopItemDatabase();
        shopItemDatabase.uuid = row.uuidOfShopItem;
        shopItemDatabase.name = row.nameOfShopItem;
        shopItemDatabase.description = row.descriptionOfShopItem;
        shopItemDatabase.slogan = row.sloganOfShopItem;
        shopItemDatabase.category = row.categoryOfShopItem;
        shopItemDatabase.price = row.priceOfShopItem;
        shopItemDatabase.currencyPrice = row.currencyPriceOfShopItem;
        shopItemDatabase.uuidImageBanner = row.uuidImageBannerOfShopItem;
        shopItemDatabase.uuidImageProduct = row.uuidImageProductOfShopItem;
        shopItemDatabase.uuidGallery = row.uuidGalleryOfShopItem;
        shopDatabase.listShopItem.push(shopItemDatabase);
    }

    return shopDatabase;
}

export const mapShopItemFromDbToShopItemDatabase = (shopItemFromDb: any) => {

    console.log('Shopitem from DB lautet: ' + shopItemFromDb);

    const shopItem = new ShopItemDatabase();
    shopItem.uuid = shopItemFromDb.uuid;
    shopItem.name = shopItemFromDb.name;
    shopItem.description = shopItemFromDb.description;
    shopItem.slogan = shopItemFromDb.sloganOfShopItem;
    shopItem.category = shopItemFromDb.categoryOfShopItem;
    shopItem.price = shopItemFromDb.price;
    shopItem.currencyPrice = shopItemFromDb.currencyPrice;
    shopItem.uuidImageBanner = shopItemFromDb.uuidImageBannerOfShopItem;
    shopItem.uuidImageProduct = shopItemFromDb.uuidImageProductOfShopItem;
    shopItem.uuidGallery = shopItemFromDb.uuidGalleryOfShopItem;
    return shopItem;
}
