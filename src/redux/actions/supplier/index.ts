import {SET_PAGE_OF_SUPPLIER} from "../../types/supplier";
import {Page} from "../../../models/Page";
import {Supplier} from "../../../models/Supplier";

interface SetPageOfSupplier {
    type: typeof SET_PAGE_OF_SUPPLIER
    payload: Page<Supplier>
}

export type SupplierActionTypes = SetPageOfSupplier

export const setPageOfSupplier = (payload: Page<Supplier>): SupplierActionTypes => {
    

    return ({type: SET_PAGE_OF_SUPPLIER, payload})
}