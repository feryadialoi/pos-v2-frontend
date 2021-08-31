import {TaxFormat} from "../TaxFormat";
import {DiscountFormat} from "../DiscountFormat";

export interface ProductOfCreatePurchaseOrderRequest {
    productId: string
    warehouseId: string
    tax: number
    taxFormat: TaxFormat
    price: number
    quantity: number
    discount: number
    discountFormat: DiscountFormat
    unitId: string
}