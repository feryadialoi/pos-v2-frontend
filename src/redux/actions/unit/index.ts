import {SET_UNITS} from "../../types/unit";
import {Unit} from "../../../models/Unit";
import {Page} from "../../../models/page";

interface SetUnits {
    type: typeof SET_UNITS
    payload: Page<Unit>
}

export type UnitActionTypes = SetUnits

export const setUnits = (payload: Page<Unit>): UnitActionTypes => {

    return ({type: SET_UNITS, payload})
}