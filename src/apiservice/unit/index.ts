import {httpClient} from "../http-client"
import {PageableRequest} from "../../models/requests/pageable-request"
import {AxiosResponse} from "axios"
import {ApiResponse} from "../../models/responses/api-response"
import {Page} from "../../models/page"
import {Unit} from "../../models/Unit"
import {CreateUnitRequest} from "../../models/requests/create-unit-request"
import {UpdateUnitRequest} from "../../models/requests/update-unit-request"


interface GetUnitsParams extends PageableRequest {
    name?: string | null

}

const getUnits = (params: GetUnitsParams) => {

    console.log('params', params)
    return httpClient
        .request<any, AxiosResponse<ApiResponse<Page<Unit>, any>>>({
            url: "/api/v1/units",
            method: "GET",
            params: params
        })
}

const getUnit = (unitId: number) => {
    return httpClient
        .request<any, AxiosResponse<ApiResponse<Unit, any>>>({
            url: "/api/v1/units/" + unitId,
            method: "GET",
        })
}

const createUnit = (createUnitRequest: CreateUnitRequest) => {
    return httpClient
        .request<CreateUnitRequest, AxiosResponse<ApiResponse<Unit, any>>>({
            url: "/api/v1/units",
            method: "POST",
            data: createUnitRequest
        })
}

const updateUnit = (unitId: number,
                    updateUnitRequest: UpdateUnitRequest) => {
    return httpClient
        .request<UpdateUnitRequest, AxiosResponse<ApiResponse<Unit, any>>>({
            url: "/api/v1/units/" + unitId,
            method: "PUT",
            data: updateUnitRequest
        })
}

const deleteUnit = (unitId: number) => {
    return httpClient
        .request<any, AxiosResponse<ApiResponse<number, any>>>({
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