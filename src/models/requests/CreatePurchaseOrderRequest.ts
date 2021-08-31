import {PaymentType} from "../PaymentType";
import {PurchaseOrderStatus} from "../PurchaseOrderStatus";
import {ProductOfCreatePurchaseOrderRequest} from "./ProductOfCreatePurchaseOrderRequest";

export interface CreatePurchaseOrderRequest {
    supplierId: string
    reference: string
    paymentType: PaymentType
    entryDate: string
    dueDate: string
    products: ProductOfCreatePurchaseOrderRequest[]
    note: string
    otherFee: number
    otherFeeDescription: string
    shippingFee: number
    shippingFeeDescription: string
    status: PurchaseOrderStatus
}

