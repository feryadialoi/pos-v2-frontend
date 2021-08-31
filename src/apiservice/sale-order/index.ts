import {httpClient} from "../http-client";
import {CreateSaleOrderRequest} from "../../models/requests/CreateSaleOrderRequest";
import {PageableRequest} from "../../models/requests/PageableRequest";

interface GetSaleOrdersParams extends PageableRequest{

}

const getSaleOrders = (params: GetSaleOrdersParams) => {
    return httpClient.request({
        url: "/api/v1/sale-orders",
        method: "GET",
        params: params,
    })
}

const createSaleOrder = (createSaleOrderRequest: CreateSaleOrderRequest) => {
    return httpClient.request({
        url: "/api/v1/sale-orders",
        method: "POST",
        data: createSaleOrderRequest
    })
}

export const saleOrderApiService = {
    getSaleOrders,
    createSaleOrder,
}