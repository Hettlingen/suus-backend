import {Currency, getCurrencyOfCode} from "./currency";

export class Amount {
    public value: number;
    public currency: Currency;

    constructor(value: number, currency: string) {
      this.value = value;
      this.currency = getCurrencyOfCode(currency);
    }
}
