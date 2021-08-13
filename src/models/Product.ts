import {Category} from "./Category";
import {Unit} from "./Unit";

export type DefaultUnit = "LARGE" | "MEDIUM" | "SMALL"

export interface Product {
    id: string
    code: string
    name: string
    category: Category
    defaultUnit: DefaultUnit
    unitLarge: Unit
    unitMedium: Unit
    unitSmall: Unit
    unitLargePrice: number
    unitMediumPrice: number
    unitSmallPrice: number
    unitConversions: ProductUnitConversion[]
}

export interface ProductUnitConversion {
    fromUnitId: number
    multiplier: number
    toUnitId: number
}