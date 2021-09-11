import {Unit} from "./Unit";
import {SimplifiedProduct} from "./SimplifiedProduct";

export interface ProductStockOfWarehouseWithProductStocks {
    id: string
    product: SimplifiedProduct
    unit: Unit
    stock: number
}