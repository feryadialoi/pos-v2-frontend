import {SET_PAGE_OF_SALE_ORDER} from "../../types/sale-order";
import {Page} from "../../../models/Page";
import {SaleOrder} from "../../../models/SaleOrder";

interface SetPageOfSaleOrder {
    type: typeof SET_PAGE_OF_SALE_ORDER
    payload: Page<SaleOrder>
}

export type SaleOrderActionTypes = SetPageOfSaleOrder

export const setPageOfSaleOrder = (payload: Page<SaleOrder>) => {
    return ({
        type: SET_PAGE_OF_SALE_ORDER,
        payload,
    })
}