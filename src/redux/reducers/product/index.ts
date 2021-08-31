import {ProductState} from "../../states/product";
import {initialPage} from "../constant";
import {ProductActionTypes} from "../../actions/product";
import {SET_PAGE_OF_PRODUCT} from "../../types/product";

const initialState: ProductState = {
    products: initialPage
}

export const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {

    switch (action.type) {
        case SET_PAGE_OF_PRODUCT:
            return {...state, products: action.payload}

        default:
            return state
    }
}

export default productReducer