import {Unit} from "./Unit";

export interface ProductUnitConversion {
    fromUnit: Unit
    multiplier: number
    toUnit: Unit
}