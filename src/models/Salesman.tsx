import {Company} from "./Company";

export interface Salesman {
    id: string
    name: string
    nationalIdentificationNumber: string
    phone: string
    address: string
    company: Company
}