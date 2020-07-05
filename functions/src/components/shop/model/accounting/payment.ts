import {Card} from "./card";
import {Invoice} from "./invoice";

export class Payment {
    public token!: string;
    public creditcard!: Card;
    public invoice!: Invoice;
}
