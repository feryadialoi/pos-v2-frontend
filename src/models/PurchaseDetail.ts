import {Product} from "./Product";
import {Warehouse} from "./Warehouse";
import {Unit} from "./Unit";

export interface PurchaseDetail {
    id: string
    product: Product
    warehouse: Warehouse
    unit: Unit
    quantity: number
    price: number
    tax: number
    discount: number
    total: number
}