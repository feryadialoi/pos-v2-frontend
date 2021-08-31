import {PaymentType} from "../PaymentType";
import {PurchaseStatus} from "../PurchaseStatus";
import {ProductOfCreatePurchaseRequest} from "./ProductOfCreatePurchaseRequest";

export interface CreatePurchaseRequest {
    dueDate: string
    entryDate: string
    note: string
    otherFee: number
    otherFeeDescription: string
    paymentType: PaymentType
    products: ProductOfCreatePurchaseRequest[]
    purchaseOrderId: string
    reference: string
    shippingFee: number
    shippingFeeDescription: string
    status: PurchaseStatus
    supplierId: string
}