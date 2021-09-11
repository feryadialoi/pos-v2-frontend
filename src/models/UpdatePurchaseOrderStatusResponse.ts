import {PurchaseOrderStatus} from "./PurchaseOrderStatus";

export interface UpdatePurchaseOrderStatusResponse {
    purchaseOrderId: string
    status: PurchaseOrderStatus
}