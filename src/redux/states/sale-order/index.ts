import {Page} from "../../../models/Page";
import {SaleOrder} from "../../../models/SaleOrder";

export interface SaleOrderState {
    pageOfSaleOrder: Page<SaleOrder>
}