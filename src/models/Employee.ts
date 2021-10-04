import {Company} from "./Company";
import {Gender} from "./Gender";
import {EmployeeStatus} from "./EmployeeStatus";
import {Religion} from "./Religion";
import {SimplifiedUser} from "./SimplifiedUser";

export interface Employee {
    active: boolean
    address: string
    addressInIdentityCard: string
    bankAccountNumber: string
    bankBranch: string
    bankName: string
    company: Company
    dateOfBirth: string
    education: string
    email: string
    officeEmail: string
    gender: Gender
    id: string
    insuranceAndSocialSecurity: string
    joinDate: string
    marriage: boolean
    name: string
    nationalIdentificationNumber: string
    phone: string
    phone2: string
    placeOfBirth: string
    religion: Religion
    status: EmployeeStatus
    taxIdentificationNumber: string
    user: SimplifiedUser
}