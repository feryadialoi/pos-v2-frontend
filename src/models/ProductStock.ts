import {SimplifiedProduct} from "./SimplifiedProduct";
import {Unit} from "./Unit";
import {Warehouse} from "./Warehouse";

export interface ProductStock {
    id: string
    product: SimplifiedProduct
    stock: number
    unit: Unit
    warehouse: Warehouse
}