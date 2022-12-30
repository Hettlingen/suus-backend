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
        shopItemDatabase.brand = row.brandOfShopItem;
        shopItemDatabase.unit = row.unitOfShopItem;
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
    const shopItem = new ShopItemDatabase();
    shopItem.uuid = shopItemFromDb.uuid;
    shopItem.name = shopItemFromDb.name;
    shopItem.description = shopItemFromDb.description;
    shopItem.slogan = shopItemFromDb.slogan;
    shopItem.brand = shopItemFromDb.brand;
    shopItem.unit = shopItemFromDb.unit;
    shopItem.category = shopItemFromDb.category;
    shopItem.price = shopItemFromDb.price;
    shopItem.currencyPrice = shopItemFromDb.currencyPrice;
    shopItem.uuidImageBanner = shopItemFromDb.uuidImageBanner;
    shopItem.uuidImageProduct = shopItemFromDb.uuidImageProduct;
    shopItem.uuidGallery = shopItemFromDb.uuidGallery;
    return shopItem;
}
