import {Gender} from "../Gender";
import {EmployeeStatus} from "../EmployeeStatus";

export interface CreateEmployeeRequest {
    active: boolean
    address: string
    addressInIdentityCard: string
    bankAccountNumber: string
    bankName: string
    companyId: string
    dateOfBirth: string
    education: string
    email: string
    officeEmail: string
    gender: Gender
    insuranceAndSocialSecurity: string
    joinDate: string
    marriage: boolean
    name: string
    nationalIdentificationNumber: string
    phone: string
    phone2: string
    placeOfBirth: string
    religion: string
    status: EmployeeStatus
    taxIdentificationNumber: string
    userId: string
}