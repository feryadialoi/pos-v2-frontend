import {Category} from "./Category";
import {Unit} from "./Unit";
import {Brand} from "./Brand";

export type DefaultUnit = "LARGE" | "MEDIUM" | "SMALL"

export interface Product {
    id: string
    code: string
    name: string
    category: Category
    brand: Brand
    units: Unit[]
    unitConversions: ProductUnitConversion[]
}

export interface ProductUnitConversion {
    fromUnitId: string
    multiplier: number
    toUnitId: string
}