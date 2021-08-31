import BigDecimal from "js-big-decimal";
import {TaxFormat} from "../models/TaxFormat";

const calculate = (amount: BigDecimal, tax: BigDecimal, taxFormat: TaxFormat) => {
    const PERCENT = new BigDecimal("100")
    if (taxFormat == "AMOUNT") {
        return tax
    } else {
        return amount.multiply(tax).divide(PERCENT, 2)
    }
}

export const taxUtil = {
    calculate,
}