import {UnitState} from "../../states/unit";
import {initialPage} from "../constant";
import {UnitActionTypes} from "../../actions/unit";
import {SET_PAGE_OF_UNIT} from "../../types/unit";

const initialState: UnitState = {
    pageOfUnit: initialPage
}

const unitReducer = (state = initialState, action: UnitActionTypes): UnitState => {
    switch (action.type) {
        case SET_PAGE_OF_UNIT:
            return {...state, pageOfUnit: action.payload}
        default:
            return state
    }
}

export default unitReducer