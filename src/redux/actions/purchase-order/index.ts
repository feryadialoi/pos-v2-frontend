import {SET_PAGE_OF_PURCHASE_ORDER} from "../../types/purchase-order";
import {Page} from "../../../models/Page";
import {PurchaseOrder} from "../../../models/PurchaseOrder";

interface SetPageOfPurchaseOrder {
    type: typeof SET_PAGE_OF_PURCHASE_ORDER
    payload: Page<PurchaseOrder>
}

export type PurchaseOrderActionTypes = SetPageOfPurchaseOrder

export const setPageOfPurchaseOrder = (payload: Page<PurchaseOrder>): PurchaseOrderActionTypes => {


    return ({
        type: SET_PAGE_OF_PURCHASE_ORDER,
        payload
    })
}