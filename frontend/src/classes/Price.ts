export class Price {
    amount: number;
    currency: string;
    symbol: string;

    constructor(amount: number, currency: string, symbol: string) {
        this.amount = amount;
        this.currency = currency;
        this.symbol = symbol;
    }
}
