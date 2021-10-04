import {Page} from "../../../models/Page";
import {Employee} from "../../../models/Employee";

export interface EmployeeState {
    pageOfEmployee: Page<Employee>
}