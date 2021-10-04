import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Customer} from "../../models/Customer";
import {Page} from "../../models/Page";
import {CreateCustomerRequest} from "../../models/requests/CreateCustomerRequest";
import {UpdateCustomerRequest} from "../../models/requests/UpdateCustomerRequest";

export interface GetCustomersParams extends PageableRequest {
    address?: string
    companyName?: string
    name?: string
    phone?: string
}

const getCustomers = (params: GetCustomersParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Customer>, any>>>({
        url: "/api/v1/customers",
        method: "GET",
        params: params
    })
}

const createCustomer = (createCustomerRequest: CreateCustomerRequest) => {
    return httpClient.request<CreateCustomerRequest, AxiosResponse<ApiResponse<Customer, any>>>({
        url: "/api/v1/customers",
        method: "POST",
        data: createCustomerRequest
    })
}

const getCustomer = (customerId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Customer, any>>>({
        url: "/api/v1/customers/" + customerId,
        method: "GET",
    })
}

const updateCustomer = (customerId: string, updateCustomerRequest: UpdateCustomerRequest) => {
    return httpClient.request<UpdateCustomerRequest, AxiosResponse<ApiResponse<Customer, any>>>({
        url: "/api/v1/customers/" + customerId,
        method: "PUT",
        data: updateCustomerRequest
    })
}

const deleteCustomer = (customerId: string) => {
    return httpClient.request({
        url: "/api/v1/customers/" + customerId,
        method: "DELETE"
    })
}

const getListCustomer = () => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Customer[], any>>>({
        url: "/api/v1/customers/list",
        method: "GET",
    })
}

export const customerApiService = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getListCustomer
}