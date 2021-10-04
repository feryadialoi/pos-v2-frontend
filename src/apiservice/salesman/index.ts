import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {CreateSalesmanRequest} from "../../models/requests/CreateSalesmanRequest";
import {UpdateSalesmanRequest} from "../../models/requests/UpdateSalesmanRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Salesman} from "../../models/Salesman";
import {Page} from "../../models/Page";

interface GetSalesmenParams extends PageableRequest {
    address?: string | null
    companyName?: string
    name?: string
    nationalIdentificationNumber?: string
    phone?: string
}

const getSalesmen = (params: GetSalesmenParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Salesman>, any>>>({
        url: "/api/v1/salesmen",
        method: "GET",
        params: params
    })
}

const getSalesman = (salesmanId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Salesman, any>>>({
        url: "/api/v1/salesmen/" + salesmanId,
        method: "GET"
    })
}

const createSalesman = (createSalesmanRequest: CreateSalesmanRequest) => {
    return httpClient.request({
        url: "/api/v1/salesmen",
        method: "POST",
        data: createSalesmanRequest
    })
}

const updateSalesman = (salesmanId: string, updateSalesmanRequest: UpdateSalesmanRequest) => {
    return httpClient.request<UpdateSalesmanRequest, AxiosResponse<ApiResponse<Salesman, any>>>({
        url: "/api/v1/salesmen/" + salesmanId,
        method: "PUT",
        data: updateSalesmanRequest
    })
}

const deleteSalesman = (salesmanId: string) => {
    return httpClient.request({
        url: "/api/v1/salesmen/" + salesmanId,
        method: "DELETE"
    })
}

export const salesmanApiService = {
    getSalesmen,
    getSalesman,
    createSalesman,
    updateSalesman,
    deleteSalesman
}