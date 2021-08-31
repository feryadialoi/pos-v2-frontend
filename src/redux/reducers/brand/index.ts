import {BrandState} from "../../states/brand";
import {initialPage} from "../constant";
import {BrandActionTypes} from "../../actions/brand";
import {SET_PAGE_OF_BRAND} from "../../types/brand";

const initialState: BrandState = {
    pageOfBrand: initialPage
}


const brandReducer = (state = initialState, action: BrandActionTypes): BrandState => {
    switch (action.type) {
        case SET_PAGE_OF_BRAND:
            return {...state, pageOfBrand: action.payload}
        default:
            return state
    }
}

export default brandReducer