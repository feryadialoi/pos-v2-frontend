import {NormalBalance} from "../NormalBalance";

export interface CreateChartOfAccountRequest {
    parentId: string | null
    level: number
    name: string
    accountCode: string
    normalBalance: NormalBalance
}