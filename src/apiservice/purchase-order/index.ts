import {httpClient} from "../http-client";
import {CreatePurchaseOrderRequest} from "../../models/requests/CreatePurchaseOrderRequest";
import {ApprovePurchaseOrderRequest} from "../../models/requests/ApprovePurchaseOrderRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {DetailedPurchaseOrder} from "../../models/DetailedPurchaseOrder";
import {Page} from "../../models/Page";
import {PurchaseOrder} from "../../models/PurchaseOrder";
import {PageableRequest} from "../../models/requests/PageableRequest";
import {PurchaseOrderStatus} from "../../models/PurchaseOrderStatus";

interface GetPurchaseOrdersParams extends PageableRequest {
    supplierName?: string | null
    status?: PurchaseOrderStatus | null
    startDate?: string | null
    endDate?: string | null
    code?: string | null
}

const getPurchaseOrders = (params: GetPurchaseOrdersParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<PurchaseOrder>, any>>>({
        url: "/api/v1/purchase-orders",
        method: "GET",
        params: params
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

const approvePurchaseOrder = (approvePurchaseOrderRequest: ApprovePurchaseOrderRequest) => {
    return httpClient.request<ApprovePurchaseOrderRequest, AxiosResponse<ApiResponse<string, ApprovePurchaseOrderRequest>>>({
        url: "/api/v1/purchase-orders/approve",
        method: "POST",
        data: approvePurchaseOrderRequest
    })
}

export const purchaseOrderApiService = {
    getPurchaseOrder,
    getPurchaseOrders,
    createPurchaseOrder,
    approvePurchaseOrder
}