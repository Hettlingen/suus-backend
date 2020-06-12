export enum OrderState {
  UNDEFINED = 0,
  SHOPPING_CART = 1,
  OPEN = 2,
  CLOSED
}

export function getOrderState(codeOrderState: number): number {
  switch(codeOrderState) {
    case OrderState.SHOPPING_CART: {
      return OrderState.SHOPPING_CART;
      break;
    }
    case OrderState.OPEN: {
      return OrderState.OPEN;
      break;
    }
    case OrderState.CLOSED: {
      return OrderState.CLOSED;
      break;
    }
    default: {
      return OrderState.UNDEFINED;
    }
  }
}