import {OrderItem} from './order-item';

export class ShoppingCart {
  public uuid!: string;
  public dateCreated!: Date;
  public listOrderItem: Array<OrderItem> = [];

  public hasOrderItem(orderItem: OrderItem): boolean {
    // @ts-ignore
    this.listOrderItem.forEach(orderItemFromShoppingCart => {
      if(orderItemFromShoppingCart.shopItem.uuid == orderItem.shopItem.uuid) {
        return true;
      }
    });
    return false;
  }

  public getOrderItem(orderItem: OrderItem): OrderItem | null {
    // @ts-ignore
    this.listOrderItem.forEach(orderItemFromShoppingCart => {
      if(orderItemFromShoppingCart.shopItem.uuid == orderItem.shopItem.uuid) {
        return orderItemFromShoppingCart;
      }
    });
    return null;
  }

  public addOrderItem(orderItem: OrderItem) {
    this.listOrderItem.push(orderItem);
  }

  public removeOrderItem(orderItem: OrderItem) {
    this.listOrderItem.forEach((orderItemFromShoppingCart,index)=>{
      if(orderItemFromShoppingCart.shopItem.uuid == orderItem.shopItem.uuid) {
        this.listOrderItem.splice(index,1);
      }
    });
  }

  public getAmountOfOrderItems(): number {
    return this.listOrderItem.length;
  }
}
