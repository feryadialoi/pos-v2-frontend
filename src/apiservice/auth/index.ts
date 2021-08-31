import {httpClient} from "../http-client";
import {LoginRequest} from "../../models/requests/LoginRequest";
import {AxiosResponse} from "axios"
import {LoginResponse} from "../../models/responses/LoginResponse"
import {ApiResponse} from "../../models/responses/ApiResponse"
import {Mapping} from "../../models/Mapping";
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