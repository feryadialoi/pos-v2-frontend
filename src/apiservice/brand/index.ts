import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Brand} from "../../models/Brand";
import {CreateBrandRequest} from "../../models/requests/CreateBrandRequest";
import {Page} from "../../models/Page";
import {UpdateBrandRequest} from "../../models/requests/UpdateBrandRequest";

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

const deleteBrand = (brandId: string) => {
    return httpClient.request({
        url:"/api/v1/brands/" + brandId,
        method: "DELETE",
    })
}

export const brandApiService = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
}