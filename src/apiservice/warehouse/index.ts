import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/api-response";
import {Page} from "../../models/page";
import {Warehouse} from "../../models/Warehouse";
import {CreateWarehouseRequest} from "../../models/requests/create-warehouse-request";
import {UpdateWarehouseRequest} from "../../models/requests/update-warehouse-request";
import {PageableRequest} from "../../models/requests/pageable-request";

interface GetWarehousesParams extends PageableRequest {
    name?: string | null
}

const getWarehouses = (params: GetWarehousesParams) => {

    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Warehouse>, any>>>({
        url: "/api/v1/warehouses",
        method: "GET",
        params: params
    })

}

const getWarehouse = (warehouseId: number) => {
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


const updateWarehouse = (warehouseId, updateWarehouseRequest: UpdateWarehouseRequest) => {
    return httpClient.request({
        url: "/api/v1/warehouses/" + warehouseId,
        method: "PUT",
        data: updateWarehouseRequest
    })
}

const deleteWarehouse = (warehouseId: number) => {
    return httpClient.request({
        url: "/api/v1/warehouses/" + warehouseId,
        method: "DELETE"
    })
}


export const warehouseApiService = {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
}