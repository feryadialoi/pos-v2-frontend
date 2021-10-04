import {EmployeeState} from "../../states/employee";
import {initialPage} from "../constant";
import {EmployeeActionTypes} from "../../actions/employee";
import {SET_PAGE_OF_EMPLOYEE} from "../../types/employee";

const initialState: EmployeeState = {
    pageOfEmployee: initialPage
}

const employeeReducer = (state: EmployeeState = initialState, action: EmployeeActionTypes): EmployeeState => {

    switch (action.type) {
        case SET_PAGE_OF_EMPLOYEE:
            return {...state, pageOfEmployee: action.payload}
        default:
            return state
    }

}

export default employeeReducer