import {Product} from "./Product";
import {Unit} from "./Unit";

export interface DetailedProductStock {
    id: string
    product: Product
    // productStockDetails: ProductStockDetail[]
    stock: number
    unit: Unit
}