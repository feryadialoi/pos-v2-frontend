import {SET_PAGE_OF_WAREHOUSE} from "../../types/warehouse";
import {Page} from "../../../models/Page";
import {Warehouse} from "../../../models/Warehouse";

interface SetPageOfWarehouse {
    type: typeof SET_PAGE_OF_WAREHOUSE
    payload: Page<Warehouse>
}

export type WarehouseActionTypes = SetPageOfWarehouse

export const setPageOfWarehouse = (payload: Page<Warehouse>): WarehouseActionTypes => {
    // ** do something here

    return ({type: SET_PAGE_OF_WAREHOUSE, payload})
}