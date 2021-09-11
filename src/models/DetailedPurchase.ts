import {PurchaseOrder} from "./PurchaseOrder";
import {Supplier} from "./Supplier";
import {PaymentType} from "./PaymentType";
import {PurchaseStatus} from "./PurchaseStatus";
import {PurchaseDetail} from "./PurchaseDetail";

export interface DetailedPurchase {
    id: string
    purchaseOrder: PurchaseOrder
    code: string
    entryDate: string
    dueDate: string
    supplier: Supplier
    reference: string
    note: string
    attachment: string | null
    shippingFee: number
    shippingFeeDescription: string
    otherFee: number
    otherFeeDescription: string
    paymentType: PaymentType
    discount: number
    tax: number
    total: number
    grandTotal: number
    status: PurchaseStatus
    purchaseDetails: PurchaseDetail[]
}