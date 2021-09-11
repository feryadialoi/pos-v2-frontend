import {httpClient} from "../http-client";
import {PageableRequest} from "../../models/requests/PageableRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Page} from "../../models/Page";
import {Purchase} from "../../models/Purchase";
import {CreatePurchaseRequest} from "../../models/requests/CreatePurchaseRequest";
import {PurchaseStatus} from "../../models/PurchaseStatus";
import {DetailedPurchase} from "../../models/DetailedPurchase";


export interface GetPurchasesParams extends PageableRequest {
    code?: string | null
    status?: PurchaseStatus | null
}

const getPurchases = (params: GetPurchasesParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Purchase>, any>>>({
        url: "/api/v1/purchases",
        method: "GET",
        params: params
    })
}

const getPurchase = (purchaseId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<DetailedPurchase, any>>>({
        url: "/api/v1/purchases/" + purchaseId,
        method: "GET"
    })
}

const createPurchase = (createPurchaseRequest: CreatePurchaseRequest) => {
    return httpClient.request<CreatePurchaseRequest, AxiosResponse<ApiResponse<Purchase, any>>>({
        url: "/api/v1/purchases",
        method: "POST",
        data: createPurchaseRequest
    })
}

export const purchaseApiService = {
    getPurchases,
    getPurchase,
    createPurchase,
}