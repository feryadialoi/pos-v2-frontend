import {DiscountFormat} from "../models/DiscountFormat";
import BigDecimal from "js-big-decimal";

const calculate = (amount: BigDecimal, discount: BigDecimal, discountFormat: DiscountFormat) => {
    const PERCENT = new BigDecimal("100")
    if (discountFormat == "AMOUNT") {
        return discount
    } else {
        return amount.multiply(discount).divide(PERCENT, 2)
    }
}

export const discountUtil = {
    calculate: calculate,
}