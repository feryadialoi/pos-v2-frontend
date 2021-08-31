import {CompanySettingValueType} from "./CompanySettingValueType";
import {ChartOfAccountOfCompanySettingWithChartOfAccount} from "./ChartOfAccountOfCompanySettingWithChartOfAccount";
import {CompanySettingCategory} from "./CompanySettingCategory";

export interface CompanySettingWithChartOfAccount {
    id: string
    chartOfAccount: ChartOfAccountOfCompanySettingWithChartOfAccount | null
    displayName: string
    settingName: string
    settingValue: string
    settingValueType: CompanySettingValueType
    settingDescription: string
    category: CompanySettingCategory
}