export class Amount {
    public value: number;
    public currency: string;

    constructor(value: number, currency: string) {
      this.value = value;
      this.currency = currency;
    }
}
