export enum Currency {
  SWISS_FRANC = 'CHF',
  EURO = 'EUR',
  DOLLAR_US = 'USD'
}

export function getCurrencyOfCode(code: string): Currency {
  switch(code) {
    case Currency.SWISS_FRANC: {
      return Currency.SWISS_FRANC;
      break;
    }
    case Currency.EURO: {
      return Currency.EURO;
      break;
    }
    case Currency.DOLLAR_US: {
      return Currency.DOLLAR_US;
      break;
    }
    default: {
      return Currency.SWISS_FRANC;
      break;
    }
  }
}
