import {SaleOrderState} from "../../states/sale-order";
import {initialPage} from "../constant";
import {SaleOrderActionTypes} from "../../actions/sale-order";
import {SET_PAGE_OF_SALE_ORDER} from "../../types/sale-order";

const initialState: SaleOrderState = {
    pageOfSaleOrder: initialPage
}

const saleOrderReducer = (state: SaleOrderState = initialState, action: SaleOrderActionTypes): SaleOrderState => {
    switch (action.type) {
        case SET_PAGE_OF_SALE_ORDER:
            return {...state, pageOfSaleOrder: action.payload}
        default:
            return state
    }
}

export default saleOrderReducer