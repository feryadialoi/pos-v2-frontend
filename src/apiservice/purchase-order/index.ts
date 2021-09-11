import {httpClient} from "../http-client";
import {CreatePurchaseOrderRequest} from "../../models/requests/CreatePurchaseOrderRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {DetailedPurchaseOrder} from "../../models/DetailedPurchaseOrder";
import {Page} from "../../models/Page";
import {PurchaseOrder} from "../../models/PurchaseOrder";
import {PageableRequest} from "../../models/requests/PageableRequest";
import {PurchaseOrderStatus} from "../../models/PurchaseOrderStatus";
import qs from 'qs'
import {UpdatePurchaseOrderStatusRequest} from "../../models/requests/UpdatePurchaseOrderStatusRequest";
import {UpdatePurchaseOrderStatusResponse} from "../../models/UpdatePurchaseOrderStatusResponse";

export interface GetPurchaseOrdersParams extends PageableRequest {
    supplierName?: string | null
    status?: PurchaseOrderStatus | null
    startDate?: string | null
    endDate?: string | null
    code?: string | null
    statuses?: PurchaseOrderStatus[] | null
}

const getPurchaseOrders = (params: GetPurchaseOrdersParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<PurchaseOrder>, any>>>({
        url: "/api/v1/purchase-orders",
        method: "GET",
        params: params,
        paramsSerializer: params1 => qs.stringify(params1, {arrayFormat: "repeat"})
    })
}

const createPurchaseOrder = (createPurchaseOrderRequest: CreatePurchaseOrderRequest) => {
    return httpClient.request<CreatePurchaseOrderRequest, AxiosResponse<ApiResponse<DetailedPurchaseOrder, CreatePurchaseOrderRequest>>>({
        url: "/api/v1/purchase-orders",
        method: "POST",
        data: createPurchaseOrderRequest,
    })
}

const getPurchaseOrder = (purchaseOrderId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<DetailedPurchaseOrder, any>>>({
        url: "/api/v1/purchase-orders/" + purchaseOrderId,
        method: "GET",
    })
}

const updatePurchaseOrderStatus = (purchaseOrderId: string, updatePurchaseOrderStatusRequest: UpdatePurchaseOrderStatusRequest) => {
    return httpClient.request<UpdatePurchaseOrderStatusRequest, AxiosResponse<ApiResponse<UpdatePurchaseOrderStatusResponse, UpdatePurchaseOrderStatusRequest>>>({
        url: "/api/v1/purchase-orders/" + purchaseOrderId + "/status",
        method: "PUT",
        data: updatePurchaseOrderStatusRequest
    })
}

export const purchaseOrderApiService = {
    getPurchaseOrder,
    getPurchaseOrders,
    createPurchaseOrder,
    updatePurchaseOrderStatus,
}