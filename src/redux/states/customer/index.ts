import {Page} from "../../../models/Page";
import {Customer} from "../../../models/Customer";

export interface CustomerState {
    pageOfCustomer: Page<Customer>
}