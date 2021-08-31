import {Page} from "../../../models/Page";
import {PurchaseOrder} from "../../../models/PurchaseOrder";

export interface PurchaseOrderState {
    pageOfPurchaseOrder: Page<PurchaseOrder>
}