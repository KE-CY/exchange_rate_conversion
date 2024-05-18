export class ExchangeRateService {
    private exchangeRates;

    constructor(exchangeRates: any) {
        this.exchangeRates = exchangeRates;
    }

    convert(source: string, target: string, amount: string): string {

        let current: number = Number(parseNumberWithCommas(amount));

        const sourceExchangeRate = this.exchangeRates.currencies[source];
        if (!sourceExchangeRate) {
            throw new Error("Invalid source currency");
        }

        const targetExchangeRate = sourceExchangeRate[target];

        if (!targetExchangeRate) {
            throw new Error("Invalid target currency");
        }

        const convertAmount = Math.round(current * targetExchangeRate * 100) / 100;;

        let parts: string[] = convertAmount.toFixed(2).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join(".");
    }
}

function parseNumberWithCommas(str: string) {
    // 移除逗號
    const stringWithoutCommas = str.replace(/,/g, '');
    // 解析為數字
    const number = parseFloat(stringWithoutCommas);
    return number;
}