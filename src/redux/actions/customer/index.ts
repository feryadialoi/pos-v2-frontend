import {SET_PAGE_OF_CUSTOMER} from "../../types/customer";
import {Page} from "../../../models/Page";
import {Customer} from "../../../models/Customer";

interface SetPageOfCustomer {
    type: typeof SET_PAGE_OF_CUSTOMER
    payload: Page<Customer>
}

export type CustomerActionTypes = SetPageOfCustomer

export const setPageOfCustomer = (payload: Page<Customer>): CustomerActionTypes => {
    return ({
        type: SET_PAGE_OF_CUSTOMER, payload
    })
}