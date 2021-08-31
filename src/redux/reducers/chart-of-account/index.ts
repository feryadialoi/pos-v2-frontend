import {ChartOfAccountState} from "../../states/chart-of-account";
import {initialPage} from "../constant";
import {ChartOfAccountActionTypes} from "../../actions/chart-of-account";
import {SET_PAGE_OF_CHART_OF_ACCOUNT} from "../../types/chart-of-account";

const initialState: ChartOfAccountState = {
    pageOfChartOfAccount: initialPage
}

const chartOfAccountReducer = (state: ChartOfAccountState = initialState, action: ChartOfAccountActionTypes): ChartOfAccountState => {
    switch (action.type) {
        case SET_PAGE_OF_CHART_OF_ACCOUNT:
            return {...state, pageOfChartOfAccount: action.payload}
        default:
            return state

    }
}

export default chartOfAccountReducer