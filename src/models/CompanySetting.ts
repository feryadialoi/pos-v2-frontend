import {CompanySettingCategory} from "./CompanySettingCategory";

export interface CompanySetting {
    id: string
    displayName: string
    settingName: string
    settingValue: string
    settingValueType: string
    category: CompanySettingCategory
    settingDescription: string
}