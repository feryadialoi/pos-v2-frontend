import {BrandState} from "../../states/brand";
import {initialPage} from "../constant";
import {BrandActionTypes} from "../../actions/brand";
import {SET_BRANDS} from "../../types/brand";

const initialState: BrandState = {
    pageOfBrand: initialPage
}


const brandReducer = (state = initialState, action: BrandActionTypes): BrandState => {
    switch (action.type) {
        case SET_BRANDS:
            return {...state, pageOfBrand: action.payload}
        default:
            return state
    }
}

export default brandReducer