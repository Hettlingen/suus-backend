export enum OfferItemState {
  UNDEFINED = 0,
  OPEN = 1,
  CLOSED = 2
}

export function getOfferItemState(codeOrderState: number): number {
  switch(codeOrderState) {
    case OfferItemState.OPEN: {
      return OfferItemState.OPEN;
      break;
    }
    case OfferItemState.CLOSED: {
      return OfferItemState.CLOSED;
      break;
    }
    default: {
      return OfferItemState.UNDEFINED;
    }
  }
}