import {WarehouseState} from "../../states/warehouse";
import {initialPage} from "../constant";
import {WarehouseActionTypes} from "../../actions/warehouse";
import {SET_WAREHOUSES} from "../../types/warehouse";

const initialState: WarehouseState = {
    pageOfWarehouse: initialPage
}

const warehouseReducer = (state = initialState, action: WarehouseActionTypes): WarehouseState => {
    switch (action.type) {
        case SET_WAREHOUSES:
            return {...state, pageOfWarehouse: action.payload}

        default:
            return state
    }
}


export default warehouseReducer