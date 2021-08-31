import {httpClient} from "../http-client";
import {CreateSaleRequest} from "../../models/requests/CreateSaleRequest";

interface GetSalesParams {

}

const getSales = (params: GetSalesParams) => {
    return httpClient.request({
        url: "/api/v1/sales",
        method: "GET",
        params: params,
    })
}

const createSale = (createSaleRequest: CreateSaleRequest) => {
    return httpClient.request({
        url: "/api/v1/sales",
        method: "POST",
        data: createSaleRequest
    })
}

export const saleApiService = {
    getSales,
    createSale,
}