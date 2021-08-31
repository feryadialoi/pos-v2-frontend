import {SET_PAGE_OF_PURCHASE} from "../../types/purchase";
import {Page} from "../../../models/Page";
import {Purchase} from "../../../models/Purchase";

interface SetPageOfPurchase {
    type: typeof SET_PAGE_OF_PURCHASE
    payload: Page<Purchase>
}

export type PurchaseActionTypes = SetPageOfPurchase

export const setPageOfPurchase = (payload: Page<Purchase>): PurchaseActionTypes => {

    return ({type: SET_PAGE_OF_PURCHASE, payload})
}