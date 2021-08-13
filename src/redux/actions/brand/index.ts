import {SET_BRANDS} from "../../types/brand";
import {Brand} from "../../../models/Brand";
import {Page} from "../../../models/page";


interface SetBrands {
    type: typeof SET_BRANDS
    payload: Page<Brand>
}

export type BrandActionTypes = SetBrands


export const setBrands = (payload: Page<Brand>): BrandActionTypes => {
    

    return ({type: SET_BRANDS, payload})
}