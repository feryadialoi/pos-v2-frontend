import {DefaultUnit, ProductUnitConversion} from "../Product";
import {Unit} from "../Unit";

export interface CreateProductRequest {
    name: string
    code: string
    categoryId: string
    brandId: string
    unitIds: string[]
    unitConversions: ProductUnitConversion[]
    idempotentKey?: string
}