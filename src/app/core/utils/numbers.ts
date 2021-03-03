export class Numbers {
    static parseNumericDecimal(input: any) {
        let val = (input).toFixed(2);
        if (val == "NaN") {
          val = (0).toFixed(2);
        }

        return val;
    }

    static parseFloatTwoDecimals(input: any) {
      let val = (input).toFixed(2);
      if (val == "NaN") {
        val = (0).toFixed(2);
      }

      return parseFloat(val);
    }

    static parseFloat(input: any) {
        if (isNaN(input)) {
          return parseFloat("0");
        }

        return parseFloat(input);
    }

    static parseInt(input: any) {
        if (isNaN(input)) {
          return this.parseInt(0);
        }
        
        return parseInt(input);
    } 
}