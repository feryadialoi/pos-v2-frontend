import {DefaultUnit, ProductUnitConversion} from "../Product";

export interface CreateProductRequest {
    name: string
    code: string
    categoryId: number

    unitLargeId: number
    unitMediumId: number
    unitSmallId: number

    defaultUnit: DefaultUnit

    unitLargePrice: number
    unitMediumPrice: number
    unitSmallPrice: number
    unitConversions: ProductUnitConversion[]
}