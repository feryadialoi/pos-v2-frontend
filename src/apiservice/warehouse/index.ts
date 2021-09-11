import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Page} from "../../models/Page";
import {Warehouse} from "../../models/Warehouse";
import {CreateWarehouseRequest} from "../../models/requests/CreateWarehouseRequest";
import {UpdateWarehouseRequest} from "../../models/requests/UpdateWarehouseRequest";
import {PageableRequest} from "../../models/requests/PageableRequest";
import {WarehouseWithProductStocks} from "../../models/WarehouseWithProductStocks";

interface GetWarehousesParams extends PageableRequest {
    name?: string | null
    address?: string | null
}

const getWarehouses = (params: GetWarehousesParams) => {

    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Warehouse>, any>>>({
        url: "/api/v1/warehouses",
        method: "GET",
        params: params
    })

}

const getListWarehouse = () => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Warehouse[], any>>>({
        url: "/api/v1/warehouses/list",
        method: "GET"
    })
}

const getWarehouse = (warehouseId: string) => {
    return httpClient.request({
        url: "/api/v1/warehouses/" + warehouseId,
        method: "GET",
    })
}

const createWarehouse = (createWarehouseRequest: CreateWarehouseRequest) => {
    return httpClient.request({
        url: "/api/v1/warehouses",
        method: "POST",
        data: createWarehouseRequest
    })
}


const updateWarehouse = (warehouseId: string, updateWarehouseRequest: UpdateWarehouseRequest) => {
    return httpClient.request({
        url: "/api/v1/warehouses/" + warehouseId,
        method: "PUT",
        data: updateWarehouseRequest
    })
}

const deleteWarehouse = (warehouseId: string) => {
    return httpClient.request({
        url: "/api/v1/warehouses/" + warehouseId,
        method: "DELETE"
    })
}

const getWarehouseWithProductStocks = (warehouseId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<WarehouseWithProductStocks, any>>>({
        url: "/api/v1/warehouses/" + warehouseId + "/product-stocks",
        method: "GET"
    })
}


export const warehouseApiService = {
    getWarehouses,
    getListWarehouse,
    getWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehouseWithProductStocks,
}