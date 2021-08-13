import {httpClient} from "../http-client";
import {LoginRequest} from "../../models/requests/login-request";
import {AxiosResponse} from "axios"
import {LoginResponse} from "../../models/responses/login-response"
import {ApiResponse} from "../../models/responses/api-response"
import {Mapping} from "../../models/mapping";
import {httpHeaders, httpHeadersValue} from "../http-headers";

const login = (loginRequest: LoginRequest) => {

    const headers: Mapping = {
        [httpHeaders.CONTENT_TYPE]: httpHeadersValue.APPLICATION_JSON,
        [httpHeaders.ACCEPT]: httpHeadersValue.APPLICATION_JSON
    }

    return httpClient.request<LoginRequest, AxiosResponse<ApiResponse<LoginResponse, any>>>({
        url: "/api/v1/auth/login",
        headers: headers,
        method: "POST",
        data: loginRequest
    })
}

export const authApiService = {
    login
}