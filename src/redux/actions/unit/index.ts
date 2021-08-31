import {SET_PAGE_OF_UNIT} from "../../types/unit";
import {Unit} from "../../../models/Unit";
import {Page} from "../../../models/Page";

interface SetPageOfUnit {
    type: typeof SET_PAGE_OF_UNIT
    payload: Page<Unit>
}

export type UnitActionTypes = SetPageOfUnit

export const setPageOfUnit = (payload: Page<Unit>): UnitActionTypes => {

    return ({type: SET_PAGE_OF_UNIT, payload})
}