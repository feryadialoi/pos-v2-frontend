import {Gender} from "../Gender";
import {EmployeeStatus} from "../EmployeeStatus";

export interface UpdateEmployeeRequest {
    active?: boolean | null
    address?: string | null
    addressInIdentityCard?: string | null
    bankAccountNumber?: string | null
    bankName?: string | null
    companyId?: string | null
    dateOfBirth?: string | null
    education?: string | null
    email?: string | null
    officeEmail?: string | null
    gender?: Gender | null
    insuranceAndSocialSecurity?: string | null
    joinDate?: string | null
    marriage?: boolean | null
    name?: string | null
    nationalIdentificationNumber?: string | null
    phone?: string | null
    phone2?: string | null
    placeOfBirth?: string | null
    religion?: string | null
    status?: EmployeeStatus | null
    taxIdentificationNumber?: string | null
    userId?: string | null
}