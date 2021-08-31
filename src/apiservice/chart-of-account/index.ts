import {PageableRequest} from "../../models/requests/PageableRequest";
import {httpClient} from "../http-client";
import {CreateChartOfAccountRequest} from "../../models/requests/CreateChartOfAccountRequest";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {ChartOfAccount} from "../../models/ChartOfAccount";

interface GetChartOfAccountsParams extends PageableRequest {
    levelLessThanOrEqual?: number | null
    levelGreaterThanOrEqual?: number | null
}

const getChartOfAccounts = (params: GetChartOfAccountsParams) => {
    return httpClient.request({
        url: "/api/v1/chart-of-accounts",
        method: "GET",
        params: params
    })
}

const getListChartOfAccount = () => {
    return httpClient.request<any, AxiosResponse<ApiResponse<ChartOfAccount[], any>>>({
        url: "/api/v1/chart-of-accounts/list",
        method: "GET"
    })
}

const createChartOfAccount = (createChartOfAccountRequest: CreateChartOfAccountRequest) => {
    return httpClient.request({
        url: "/api/v1/chart-of-accounts",
        method: "GET",
        data: createChartOfAccountRequest,
    })
}

export const chartOfAccountApiService = {
    getChartOfAccounts,
    getListChartOfAccount,
    createChartOfAccount,
}

