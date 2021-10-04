import {CustomerState} from "../../states/customer";
import {initialPage} from "../constant";
import {CustomerActionTypes} from "../../actions/customer";
import {SET_PAGE_OF_CUSTOMER} from "../../types/customer";

const initialState: CustomerState = {
    pageOfCustomer: initialPage
}

const customerReducer = (state: CustomerState = initialState, action: CustomerActionTypes): CustomerState => {
    switch (action.type) {
        case SET_PAGE_OF_CUSTOMER:
            return {...state, pageOfCustomer: action.payload}
        default:
            return state
    }
}

export default customerReducer