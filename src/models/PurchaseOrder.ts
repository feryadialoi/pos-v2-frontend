import {Supplier} from "./Supplier";
import {PaymentType} from "./PaymentType";
import {PurchaseOrderStatus} from "./PurchaseOrderStatus";

export interface PurchaseOrder {
    attachment: string
    code: string
    discount: 0
    dueDate: string
    entryDate: string
    grandTotal: 0
    id: string
    note: string
    otherFee: 0
    otherFeeDescription: string
    paymentType: PaymentType
    reference: string
    shippingFee: 0
    shippingFeeDescription: string
    supplier: Supplier
    tax: 0
    total: 0
    status: PurchaseOrderStatus
}