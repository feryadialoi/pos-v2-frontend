import {WarehouseState} from "../../states/warehouse";
import {initialPage} from "../constant";
import {WarehouseActionTypes} from "../../actions/warehouse";
import {SET_PAGE_OF_WAREHOUSE} from "../../types/warehouse";

const initialState: WarehouseState = {
    pageOfWarehouse: initialPage
}

const warehouseReducer = (state = initialState, action: WarehouseActionTypes): WarehouseState => {
    switch (action.type) {
        case SET_PAGE_OF_WAREHOUSE:
            return {...state, pageOfWarehouse: action.payload}

        default:
            return state
    }
}


export default warehouseReducer