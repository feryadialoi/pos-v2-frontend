import {PaymentType} from "../PaymentType";
import {PurchaseOrderStatus} from "../PurchaseOrderStatus";
import {ProductOfCreatePurchaseOrderRequest} from "./ProductOfCreatePurchaseOrderRequest";

export interface CreatePurchaseOrderRequest {
    supplierId: string
    paymentType: PaymentType
    entryDate: string
    dueDate: string | null
    term: number | null
    products: ProductOfCreatePurchaseOrderRequest[]
    status: PurchaseOrderStatus
    reference: string
    note: string
    otherFee: number
    otherFeeDescription: string
    shippingFee: number
    shippingFeeDescription: string
}

