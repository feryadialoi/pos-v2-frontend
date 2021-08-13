import {PageableRequest} from "../../models/requests/pageable-request";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/api-response";
import {Brand} from "../../models/Brand";
import {CreateBrandRequest} from "../../models/requests/create-brand-request";
import {Page} from "../../models/page";

interface GetBrandsParams extends PageableRequest {
    name?: string | null
}

const getUnits = (params: GetBrandsParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Brand>, any>>>({
        url: "/api/v1/brands",
        method: "GET",
        params: params
    })
}

const createUnit = (createBrandRequest: CreateBrandRequest) => {
    return httpClient.request<CreateBrandRequest, AxiosResponse<ApiResponse<Brand, any>>>({
        url: "/api/v1/brands",
        method: "POST",
        data: createBrandRequest
    })
}

export const brandApiService = {
    getUnits,
    createUnit,
}