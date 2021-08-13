import {SET_PRODUCTS} from "../../types/product";
import {Page} from "../../../models/page";
import {Product} from "../../../models/Product";

interface SetProduct {
    type: typeof SET_PRODUCTS
    payload: Page<Product>
}

export type ProductActionTypes = SetProduct

export const setProducts = (payload: Page<Product>): ProductActionTypes => {

    return ({type: SET_PRODUCTS, payload})
}