import {SET_PAGE_OF_SALESMAN} from "../../types/salesman";
import {Page} from "../../../models/Page";
import {Salesman} from "../../../models/Salesman";

interface SetPageOfSalesman {
    type: typeof SET_PAGE_OF_SALESMAN
    payload: Page<Salesman>
}

export type SalesmanActionTypes = SetPageOfSalesman

export const setPageOfSalesman = (payload: Page<Salesman>) => {
    return ({
        type: SET_PAGE_OF_SALESMAN, payload
    })
}