import {SET_PAGE_OF_EMPLOYEE} from "../../types/employee";
import {Page} from "../../../models/Page";
import {Employee} from "../../../models/Employee";

interface SetPageOfEmployee {
    type: typeof SET_PAGE_OF_EMPLOYEE
    payload: Page<Employee>
}

export type EmployeeActionTypes = SetPageOfEmployee

export const setPageOfEmployee = (payload: Page<Employee>): EmployeeActionTypes => {
    return ({type: SET_PAGE_OF_EMPLOYEE, payload})
}