import {DiscountFormat} from "../DiscountFormat";
import {TaxFormat} from "../TaxFormat";

export interface ProductOfCreatePurchaseRequest {
    discount: number
    discountFormat: DiscountFormat
    price: number
    productId: string
    quantity: number
    tax: number
    taxFormat: TaxFormat
    unitId: string
    warehouseId: string
}