import {PageableRequest} from "../../models/requests/pageable-request";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/api-response";
import {Brand} from "../../models/Brand";
import {CreateBrandRequest} from "../../models/requests/create-brand-request";
import {Page} from "../../models/page";
import {UpdateBrandRequest} from "../../models/requests/update-brand-request";

interface GetBrandsParams extends PageableRequest {
    name?: string | null
}

const getBrands = (params: GetBrandsParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Brand>, any>>>({
        url: "/api/v1/brands",
        method: "GET",
        params: params
    })
}

const createBrand = (createBrandRequest: CreateBrandRequest) => {
    return httpClient.request<CreateBrandRequest, AxiosResponse<ApiResponse<Brand, any>>>({
        url: "/api/v1/brands",
        method: "POST",
        data: createBrandRequest
    })
}

const updateBrand = (brandId: string, updateBrandRequest: UpdateBrandRequest) => {
    return httpClient.request<CreateBrandRequest, AxiosResponse<ApiResponse<Brand, any>>>({
        url: "/api/v1/brands/" + brandId,
        method: "PUT",
        data: updateBrandRequest
    })
}

export const brandApiService = {
    getBrands,
    createBrand,
    updateBrand,
}