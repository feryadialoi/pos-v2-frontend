import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Page} from "../../models/Page";
import {Employee} from "../../models/Employee";
import {CreateEmployeeRequest} from "../../models/requests/CreateEmployeeRequest";
import {UpdateEmployeeRequest} from "../../models/requests/UpdateEmployeeRequest";
import {Gender} from "../../models/Gender";
import {EmployeeStatus} from "../../models/EmployeeStatus";

interface GetEmployeesParams extends PageableRequest {
    address?: string
    addressInIdentityCard?: string
    bankAccountNumber?: string
    bankName?: string
    companyName?: string
    dateOfBirth?: string
    education?: string
    email?: string
    gender?: Gender
    insuranceAndSocialSecurity?: string
    joinDate?: string
    marriage?: boolean
    name?: string
    nationalIdentificationNumber?: string
    phone?: string
    phone2?: string
    placeOfBirth?: string
    religion?: string
    status?: EmployeeStatus
    taxIdentificationNumber?: string
    userName?: string
}

const getEmployees = (params: GetEmployeesParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Employee>, any>>>({
        url: "/api/v1/employees",
        method: "GET",
        params: params
    })
}

const createEmployee = (createEmployeeRequest: CreateEmployeeRequest) => {
    return httpClient.request<CreateEmployeeRequest, AxiosResponse<ApiResponse<Employee, any>>>({
        url: "/api/v1/employees",
        method: "POST",
        data: createEmployeeRequest
    })
}

const getEmployee = (employeeId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Employee, any>>>({
        url: "/api/v1/employees/" + employeeId,
        method: "GET"
    })
}

const updateEmployee = (employeeId: string, updateEmployeeRequest: UpdateEmployeeRequest) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Employee, any>>>({
        url: "/api/v1/employees/" + employeeId,
        method: "PUT",
        data: updateEmployeeRequest
    })
}

const deleteEmployee = (employeeId: string) => {
    return httpClient.request({
        url: "/api/v1/employees/" + employeeId,
        method: "DELETE"
    })
}

export const employeeApiService = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}