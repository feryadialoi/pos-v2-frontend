import {httpClient} from "../http-client";
import {PageableRequest} from "../../models/requests/PageableRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Page} from "../../models/Page";
import {ProductStock} from "../../models/ProductStock";
import {DetailedProductStock} from "../../models/DetailedProductStock";


interface GetProductStocksParams extends PageableRequest {
    productCategoryName?: string
    productCode?: string
    productName?: string
    warehouseId?: string
    stock?: number
    stockGe?: number
    stockGt?: number
    stockLe?: number
    stockLt?: number
}

const getProductStocks = (params: GetProductStocksParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<ProductStock>, any>>>({
        url: "/api/v1/product-stocks",
        method: "GET",
        params: params
    })
}

const getProductStock = (productStockId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<DetailedProductStock, any>>>({
        url: "/api/v1/product-stocks/" + productStockId,
        method: "GET",
    })
}

export const productStockApiService = {
    getProductStocks,
}