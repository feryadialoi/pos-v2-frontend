import axios, {AxiosResponse, AxiosRequestConfig} from "axios";
import {
    HttpBadRequestError,
    HttpForbiddenError, HttpInternalServerErrorError,
    HttpNotFoundError,
    HttpUnauthorizedError,
    HttpUnprocessableEntityError, UnauthenticateErrorType
} from "./http-error";
import {authLocalPersistence} from "../localpersistence/auth";
import {userLocalPersistence} from "../localpersistence/user";
import {ApiResponse} from "../models/responses/ApiResponse";
import {Mapping} from "../models/Mapping";
import {httpHeaders, httpHeadersValue} from "./http-headers";
import {store} from "../redux/storeConfig/store";
import {setAccessToken} from "../redux/actions/auth";

interface RefreshTokenRequest {
    accessToken: string
    refreshToken: string
}

interface RefreshTokenResponse {
    accessToken: string
}

const requestRefreshToken = () => {
    const auth = authLocalPersistence.getAuth()
    const headers: Mapping = {
        [httpHeaders.CONTENT_TYPE]: httpHeadersValue.APPLICATION_JSON,
        [httpHeaders.ACCEPT]: httpHeadersValue.APPLICATION_JSON
    }
    return axiosApiInstance.request<RefreshTokenRequest, AxiosResponse<ApiResponse<RefreshTokenResponse, any>>>({
        url: "/api/v1/auth/refresh-token", method: "POST", headers: headers,
        data: {accessToken: auth?.accessToken, refreshToken: auth?.refreshToken,}
    })
}

const passResponseInterceptors = (response: AxiosResponse) => {
    return response
}

const setRequestInterceptors = (request: AxiosRequestConfig) => {
    request.baseURL = process.env.REACT_APP_BASE_URL

    switch (request.url) {
        case "/api/v1/auth/login":
            request.headers.Authorization = undefined
            break
        case "/api/v1/auth/refresh-token":
            request.headers.Authorization = undefined
            break
        default:
            request.headers.Authorization = `Bearer ${authLocalPersistence.getAuth()?.accessToken}`
    }

    return request
};

const handleTokenExpiredException = async error => {
    const originalRequest = error.config as (AxiosRequestConfig & { _retry: boolean | undefined })
    if (!originalRequest._retry) {
        originalRequest._retry = true
        const response = await requestRefreshToken()

        console.log('refresh token response', response)
        const {accessToken} = response.data.data
        authLocalPersistence.setAccessToken(accessToken)
        store.dispatch(setAccessToken(accessToken))
        axiosApiInstance.defaults.headers.Authorization = 'Bearer ' + accessToken
        originalRequest.headers.Authorization = 'Bearer ' + accessToken
        return axiosApiInstance(originalRequest)
    }

    return Promise.reject(error);
};

const handleRefreshTokenExpiredException = () => {
    authLocalPersistence.removeAuth()
    userLocalPersistence.removeUserId()
    userLocalPersistence.removeUserData()
    window.location.href = "/login"
};

const handleBadCredentialsOrUsernameNotFoundException = error => {
    throw new HttpUnauthorizedError("Unauthorized", error.response.data)
};

const setResponseErrorInterceptors = async error => {
    if (error?.response?.status === 401) {
        const errorType = error.response.headers[httpHeaders.X_ERROR_TYPE.toLowerCase()] as UnauthenticateErrorType

        if (errorType == "BadCredentialsException" || errorType == "UsernameNotFoundException") {
            handleBadCredentialsOrUsernameNotFoundException(error);
        } else if (errorType == "TokenExpiredException") {
            return await handleTokenExpiredException(error);
        } else if (errorType == "RefreshTokenExpiredException") {
            handleRefreshTokenExpiredException();
        }
    }

    if (error?.response?.status === 400) throw new HttpBadRequestError("Bad Request", error.response.data)
    if (error?.response?.status === 403) throw new HttpForbiddenError("Forbidden", error.response.data)
    if (error?.response?.status === 404) throw new HttpNotFoundError("Not Found", error.response.data)
    if (error?.response?.status === 422) throw new HttpUnprocessableEntityError("Unprocessable Entity", error.response.data)
    if (error?.response?.status === 500) throw new HttpInternalServerErrorError("Internal Server Error", error.response.data)

    return Promise.reject(error)
};

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(setRequestInterceptors)

axiosApiInstance.interceptors.response.use(passResponseInterceptors, setResponseErrorInterceptors)

export const httpClient = axiosApiInstance