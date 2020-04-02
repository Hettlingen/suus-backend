import {Shop} from "../model/shop";
import {ShopItem} from "../model/shop-item";

export const mapShopFromDbToShop = (shopFromDb: any) => {
    const shop = new Shop();

    shop.uuid = shopFromDb[0].uuid;
    shop.name = shopFromDb[0].name;
    shop.description = shopFromDb[0].description;

    for (let row of shopFromDb) {
        console.log('Row lautet: ' + JSON.stringify(row));
        let shopItem = new ShopItem();
        shopItem.uuid = row.uuidOfShopItem;
        shopItem.name = row.nameOfShopItem;
        shopItem.description = row.descriptionOfShopItem;
        shopItem.price = row.priceOfShopItem;
        shopItem.currencyPrice = row.currencyPriceOfShopItem;
        shop.listShopItem.push(shopItem);
    }

    return shop;
}