import {httpClient} from "../http-client";
import {CreateSupplierRequest} from "../../models/requests/CreateSupplierRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Supplier} from "../../models/Supplier";
import {Page} from "../../models/Page";
import {PageableRequest} from "../../models/requests/PageableRequest";
import {UpdateSupplierRequest} from "../../models/requests/UpdateSupplierRequest";

const getListSupplier = () => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Supplier[], any>>>({
        url: "/api/v1/suppliers/list",
        method: "GET"
    })
}

interface GetSuppliersParams extends PageableRequest {
    name?: string | null
}

const getSuppliers = (params: GetSuppliersParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Supplier>, any>>>({
        url: "/api/v1/suppliers",
        method: "GET",
        params: params
    })
}

const createSupplier = (createSupplierRequest: CreateSupplierRequest) => {
    return httpClient.request<CreateSupplierRequest, AxiosResponse<ApiResponse<Supplier, any>>>({
        url: "/api/v1/suppliers",
        method: "POST",
        data: createSupplierRequest
    })
}

const updateSupplier = (supplierId: string, updateSupplierRequest: UpdateSupplierRequest) => {
    return httpClient.request<CreateSupplierRequest, AxiosResponse<ApiResponse<Supplier, any>>>({
        url: "/api/v1/suppliers/" + supplierId,
        method: "PUT",
        data: updateSupplierRequest
    })
}

export const supplierApiService = {
    getListSupplier,
    getSuppliers,
    createSupplier,
    updateSupplier,
}