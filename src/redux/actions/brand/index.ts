import {SET_PAGE_OF_BRAND} from "../../types/brand";
import {Brand} from "../../../models/Brand";
import {Page} from "../../../models/Page";


interface SetPageOfBrand {
    type: typeof SET_PAGE_OF_BRAND
    payload: Page<Brand>
}

export type BrandActionTypes = SetPageOfBrand


export const setPageOfBrand = (payload: Page<Brand>): BrandActionTypes => {
    

    return ({type: SET_PAGE_OF_BRAND, payload})
}