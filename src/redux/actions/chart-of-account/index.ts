import {SET_PAGE_OF_CHART_OF_ACCOUNT} from "../../types/chart-of-account";
import {Page} from "../../../models/Page";
import {ChartOfAccount} from "../../../models/ChartOfAccount";

interface SetPageOfChartOfAccount {
    type: typeof SET_PAGE_OF_CHART_OF_ACCOUNT
    payload: Page<ChartOfAccount>
}

export type ChartOfAccountActionTypes = SetPageOfChartOfAccount

export const setPageOfChartOfAccount = (payload: Page<ChartOfAccount>): ChartOfAccountActionTypes => {


    return ({
        type: SET_PAGE_OF_CHART_OF_ACCOUNT,
        payload
    })
}