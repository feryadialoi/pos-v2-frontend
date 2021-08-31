import {SET_PAGE_OF_PRODUCT} from "../../types/product";
import {Page} from "../../../models/Page";
import {Product} from "../../../models/Product";

interface SetPageOfProduct {
    type: typeof SET_PAGE_OF_PRODUCT
    payload: Page<Product>
}

export type ProductActionTypes = SetPageOfProduct

export const setPageOfProduct = (payload: Page<Product>): ProductActionTypes => {

    return ({type: SET_PAGE_OF_PRODUCT, payload})
}