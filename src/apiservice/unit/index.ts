import {httpClient} from "../http-client"
import {PageableRequest} from "../../models/requests/PageableRequest"
import {AxiosResponse} from "axios"
import {ApiResponse} from "../../models/responses/ApiResponse"
import {Page} from "../../models/Page"
import {Unit} from "../../models/Unit"
import {CreateUnitRequest} from "../../models/requests/CreateUnitRequest"
import {UpdateUnitRequest} from "../../models/requests/UpdateUnitRequest"


interface GetUnitsParams extends PageableRequest {
    name?: string | null

}

const getUnits = (params: GetUnitsParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Unit>, any>>>({
        url: "/api/v1/units",
        method: "GET",
        params: params
    })
}

const getUnit = (unitId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Unit, any>>>({
        url: "/api/v1/units/" + unitId,
        method: "GET",
    })
}

const createUnit = (createUnitRequest: CreateUnitRequest) => {
    return httpClient.request<CreateUnitRequest, AxiosResponse<ApiResponse<Unit, any>>>({
        url: "/api/v1/units",
        method: "POST",
        data: createUnitRequest
    })
}

const updateUnit = (unitId: string,
                    updateUnitRequest: UpdateUnitRequest) => {
    return httpClient.request<UpdateUnitRequest, AxiosResponse<ApiResponse<Unit, any>>>({
        url: "/api/v1/units/" + unitId,
        method: "PUT",
        data: updateUnitRequest
    })
}

const deleteUnit = (unitId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<any, any>>>({
        url: "/api/v1/units/" + unitId,
        method: "DELETE",
    })
}

export const unitApiService = {
    getUnits,
    getUnit,
    createUnit,
    updateUnit,
    deleteUnit
}