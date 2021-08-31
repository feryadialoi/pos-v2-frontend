import {SaleState} from "../../states/sale";
import {initialPage} from "../constant";
import {SaleActionTypes} from "../../actions/sale";
import {SET_PAGE_OF_SALE} from "../../types/sale";

const initialState: SaleState = {
    pageOfSale: initialPage
}

const saleReducer = (state: SaleState = initialState, action: SaleActionTypes): SaleState => {
    switch (action.type) {
        case SET_PAGE_OF_SALE:
            return {...state, pageOfSale: action.payload}
        default:
            return state
    }
}

export default saleReducer