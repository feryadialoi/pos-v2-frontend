import {Category} from "./Category";
import {Unit} from "./Unit";
import {Brand} from "./Brand";
import {ProductUnitConversion} from "./ProductUnitConversion";

export interface Product {
    id: string
    code: string
    name: string
    category: Category
    brand: Brand
    units: Unit[]
    unitConversions: ProductUnitConversion[]
}