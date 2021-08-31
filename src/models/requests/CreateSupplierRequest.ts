export interface CreateSupplierRequest {
    name: string
    address: string

    pic: string
    phone: string
    email: string

    bankName: string
    bankBranch: string
    bankAccountNumber: string

    taxIdentificationNumber: string
    taxableFirmName: string
    taxableFirmAddress: string
}
