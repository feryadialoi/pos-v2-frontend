import {initialPage} from "../constant";
import {PurchaseState} from "../../states/purchase";
import {PurchaseActionTypes} from "../../actions/purchase";
import {SET_PAGE_OF_PURCHASE} from "../../types/purchase";

const initialState: PurchaseState = {
    pageOfPurchase: initialPage
}

const purchaseReducer = (state = initialState, action: PurchaseActionTypes): PurchaseState => {
    switch (action.type) {
        case SET_PAGE_OF_PURCHASE:
            return {...state, pageOfPurchase: action.payload}
        default:
            return state
    }
}

export default purchaseReducer