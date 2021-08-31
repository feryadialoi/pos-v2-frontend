import {Page} from "../../../models/Page";
import {Sale} from "../../../models/Sale";

export interface SaleState {
    pageOfSale: Page<Sale>
}