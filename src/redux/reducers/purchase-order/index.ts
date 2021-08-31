import {initialPage} from "../constant";
import {PurchaseOrderState} from "../../states/purchase-order";
import {PurchaseOrderActionTypes} from "../../actions/purchase-order";
import {SET_PAGE_OF_PURCHASE_ORDER} from "../../types/purchase-order";

const initialState: PurchaseOrderState = {
    pageOfPurchaseOrder: initialPage
}

const purchaseOrderReducer = (state: PurchaseOrderState = initialState, action: PurchaseOrderActionTypes): PurchaseOrderState => {
    switch (action.type) {
        case SET_PAGE_OF_PURCHASE_ORDER:
            return {...state, pageOfPurchaseOrder: action.payload}
        default:
            return state
    }
}

export default purchaseOrderReducer