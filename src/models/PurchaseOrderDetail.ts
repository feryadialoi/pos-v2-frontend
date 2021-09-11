import {Product} from "./Product";
import {Unit} from "./Unit";
import {DiscountFormat} from "./DiscountFormat";
import {TaxFormat} from "./TaxFormat";
import {Warehouse} from "./Warehouse";

export interface PurchaseOrderDetail {
    total: number
    discount: number
    discountFormat: DiscountFormat
    id: string
    price: number
    product: Product
    warehouse: Warehouse
    unit: Unit
    quantity: number
    tax: number
    taxFormat: TaxFormat
}