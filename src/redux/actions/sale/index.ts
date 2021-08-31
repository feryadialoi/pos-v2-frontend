import {SET_PAGE_OF_SALE} from "../../types/sale";
import {Page} from "../../../models/Page";
import {Sale} from "../../../models/Sale";

interface SetPageOfSale {
    type: typeof SET_PAGE_OF_SALE
    payload: Page<Sale>
}


export type SaleActionTypes = SetPageOfSale

export const setPageOfSale = (payload: Page<Sale>): SaleActionTypes => {

    return ({
        type: SET_PAGE_OF_SALE,
        payload
    })
}
