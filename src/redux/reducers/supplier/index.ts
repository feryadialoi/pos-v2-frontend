import {SupplierState} from "../../states/supplier";
import {initialPage} from "../constant";
import {SupplierActionTypes} from "../../actions/supplier";
import {SET_PAGE_OF_SUPPLIER} from "../../types/supplier";

const initialState: SupplierState = {
    pageOfSupplier: initialPage
}


export const supplierReducer = (state = initialState, action: SupplierActionTypes): SupplierState => {
    switch (action.type) {
        case SET_PAGE_OF_SUPPLIER:
            return {...state, pageOfSupplier: action.payload}
        default:
            return state
    }
}

export default supplierReducer