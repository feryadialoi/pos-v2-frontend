import {PageableRequest} from "../../models/requests/PageableRequest";
import {CompanySettingCategory} from "../../models/CompanySettingCategory";
import {httpClient} from "../http-client";
import {ApiResponse} from "../../models/responses/ApiResponse";
import {CompanySetting} from "../../models/CompanySetting";
import {AxiosResponse} from "axios";
import {CompanySettingWithChartOfAccount} from "../../models/CompanySettingWithChartOfAccount";
import {UpdateBatchCompanySettingWithChartOfAccountRequest} from "../../models/requests/UpdateBatchCompanySettingWithChartOfAccountRequest";

interface GetCompanySettingsParams extends PageableRequest {
    category?: CompanySettingCategory | null
}

const getCompanySettings = (params: GetCompanySettingsParams) => {

}

interface GetListCompanySettingParams {
    category?: CompanySettingCategory | null
}

const getListCompanySetting = (params: GetListCompanySettingParams) => {
    return httpClient.request<any, AxiosResponse<ApiResponse<CompanySetting[], any>>>({
        url: "/api/v1/company-settings/list",
        method: "GET",
        params: params
    })
}

const getListCompanySettingWithChartOfAccount = () => {
    return httpClient.request<any, AxiosResponse<ApiResponse<CompanySettingWithChartOfAccount[], any>>>({
        url: "/api/v1/company-settings/chart-of-account",
        method: "GET"
    })
}

const updateBatchCompanySettingWithChartOfAccount = (updateBatchCompanySettingWithChartOfAccountRequest: UpdateBatchCompanySettingWithChartOfAccountRequest) => {
    return httpClient.request({
        url: "/api/v1/company-settings/batch",
        method: "PUT",
        data: updateBatchCompanySettingWithChartOfAccountRequest
    })
}

export const companySettingApiService = {
    getListCompanySetting,
    getListCompanySettingWithChartOfAccount,
    updateBatchCompanySettingWithChartOfAccount
}