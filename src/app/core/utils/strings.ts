export class Strings {
    static isNullOrEmpty(str) {
        str=str.trim();
        return (!str || 0 === str.length);
    }

    static parseDecimal(input: any) {
        if (isNaN(input)) {
          return '0.00';
        }
        let decimal : string = input.toFixed(2).replace(',','.')
        return decimal;
    }
}