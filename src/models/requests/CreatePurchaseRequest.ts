import {PaymentType} from "../PaymentType";
import {PurchaseStatus} from "../PurchaseStatus";
import {ProductOfCreatePurchaseRequest} from "./ProductOfCreatePurchaseRequest";

export interface CreatePurchaseRequest {
    supplierId: string
    purchaseOrderId: string | null
    entryDate: string
    dueDate: string | null
    term: number | null
    paymentType: PaymentType
    products: ProductOfCreatePurchaseRequest[]
    status: PurchaseStatus
    reference: string
    note: string
    otherFee: number
    otherFeeDescription: string
    shippingFee: number
    shippingFeeDescription: string
}