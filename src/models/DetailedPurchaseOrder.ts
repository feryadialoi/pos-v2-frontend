import {PaymentType} from "./PaymentType";
import {PurchaseOrderStatus} from "./PurchaseOrderStatus";
import {PurchaseOrderDetail} from "./PurchaseOrderDetail";
import {Supplier} from "./Supplier";

export interface DetailedPurchaseOrder {
    attachment: string
    code: string
    discount: number
    dueDate: string
    entryDate: string
    grandTotal: number
    id: string
    note: string
    otherFee: number
    otherFeeDescription: string
    paymentType: PaymentType
    purchaseOrderDetails: PurchaseOrderDetail[]
    reference: string
    shippingFee: number
    shippingFeeDescription: string
    status: PurchaseOrderStatus
    supplier: Supplier
    tax: number
    total: number
}
