
import {Unit} from "../Unit";
import {ProductUnitConversionRequest} from "./ProductUnitConversionRequest";

export interface CreateProductRequest {
    name: string
    code: string
    categoryId: string
    brandId: string
    unitIds: string[]
    unitConversions: ProductUnitConversionRequest[]
    idempotentKey?: string
}