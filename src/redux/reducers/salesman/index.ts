import {SalesmanState} from "../../states/salesman";
import {initialPage} from "../constant";
import {SalesmanActionTypes} from "../../actions/salesman";
import {SET_PAGE_OF_SALESMAN} from "../../types/salesman";

const initialState: SalesmanState = {
    pageOfSalesman: initialPage
}

const salesmanReducer = (state: SalesmanState = initialState, action: SalesmanActionTypes): SalesmanState => {
    switch (action.type) {
        case SET_PAGE_OF_SALESMAN:
            return {...state, pageOfSalesman: action.payload}
        default:
            return state
    }
}

export default salesmanReducer