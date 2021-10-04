import {PaymentType} from "./PaymentType";
import {SaleOrder} from "./SaleOrder";

export interface Sale {
    attachment: string
    code: string
    customer: string
    discount: string
    dueDate: string
    grandTotal: string
    id: string;
    note: string
    otherFee: string
    otherFeeDescription: string
    paymentType: PaymentType
    reference: string
    saleOrder:SaleOrder

}