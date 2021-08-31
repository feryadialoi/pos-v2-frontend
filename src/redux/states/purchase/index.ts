import {Page} from "../../../models/Page";
import {Purchase} from "../../../models/Purchase";

export interface PurchaseState {
    pageOfPurchase: Page<Purchase>
}