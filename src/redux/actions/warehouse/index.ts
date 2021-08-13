import {SET_WAREHOUSES} from "../../types/warehouse";
import {Page} from "../../../models/page";
import {Warehouse} from "../../../models/Warehouse";

interface SetWarehouses {
    type: typeof SET_WAREHOUSES
    payload: Page<Warehouse>
}

export type WarehouseActionTypes = SetWarehouses

export const setWarehouses = (payload: Page<Warehouse>): WarehouseActionTypes => {
    // ** do something here

    return ({type: SET_WAREHOUSES, payload})
}