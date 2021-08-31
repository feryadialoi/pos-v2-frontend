import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {Page} from "../../models/Page";
import {Category} from "../../models/Category";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {CreateCategoryRequest} from "../../models/requests/CreateCategoryRequest";
import {UpdateCategoryRequest} from "../../models/requests/UpdateCategoryRequest";

export interface GetCategoriesParams extends PageableRequest {
    name?: string | null
}

const getCategories = (params: GetCategoriesParams) => {

    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Category>, any>>>({
        url: "/api/v1/categories",
        method: "GET",
        params: params
    })

}

const getCategory = (categoryId: string) => {

    return httpClient.request<any, AxiosResponse<ApiResponse<Category, any>>>({
        url: "/api/v1/categories/" + categoryId,
        method: "GET",
    })

}

const createCategory = (createCategoryRequest: CreateCategoryRequest) => {
    return httpClient.request<CreateCategoryRequest, AxiosResponse<ApiResponse<Category, any>>>({
        url: "/api/v1/categories",
        method: "POST",
        data: createCategoryRequest
    })
}

const updateCategory = (categoryId: string, updateCategoryRequest: UpdateCategoryRequest) => {
    return httpClient.request<UpdateCategoryRequest, AxiosResponse<ApiResponse<Category, any>>>({
        url: "/api/v1/categories/" + categoryId,
        method: "PUT",
        data: updateCategoryRequest
    })
}

const deleteCategory = (categoryId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<any, any>>>({
        url: "/api/v1/categories/" + categoryId,
        method: "DELETE",
    })
}


export const categoryApiService = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}
