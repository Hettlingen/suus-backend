export enum DeliveryState {
  UNDEFINED = 0,
  OPEN = 1,
  CLOSED = 2
}

export function getDeliveryState(codeOrderState: number): number {
  switch(codeOrderState) {
    case DeliveryState.OPEN: {
      return DeliveryState.OPEN;
      break;
    }
    case DeliveryState.CLOSED: {
      return DeliveryState.CLOSED;
      break;
    }
    default: {
      return DeliveryState.UNDEFINED;
    }
  }
}