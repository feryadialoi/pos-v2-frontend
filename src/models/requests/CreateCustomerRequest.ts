export interface CreateCustomerRequest {
    name: string
    nationalIdentificationNumber?: string
    address: string
    phone: string
    phone2?: string
    description?: string
}