import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {Page} from "../../models/Page";
import {Product} from "../../models/Product";
import {CreateProductRequest} from "../../models/requests/CreateProductRequest";
import {UpdateProductRequest} from "../../models/requests/UpdateProductRequest";

interface GetProductsParams extends PageableRequest {
    name?: string | null
    code?: string | null
    categoryName?: string | null
}


const getProducts = (params: GetProductsParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Product>, any>>>({
        url: "/api/v1/products",
        method: "GET",
        params: params
    })
}

const getProduct = (productId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Page<Product>, any>>>({
        url: "/api/v1/products/" + productId,
        method: "GET",
    })
}

const createProduct = (createProductRequest: CreateProductRequest) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Product, any>>>({
        url: "/api/v1/products",
        method: "POST",
        data: createProductRequest
    })
}

const updateProduct = (productId: string, updateProductRequest: UpdateProductRequest) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Product, any>>>({
        url: "/api/v1/products/" + productId,
        method: "PUT",
        data: updateProductRequest
    })
}

const deleteProduct = (productId: string) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<Product, any>>>({
        url: "/api/v1/products/" + productId,
        method: "DELETE",
    })
}

export const productApiService = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct

}