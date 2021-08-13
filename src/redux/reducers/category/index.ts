import {CategoryState} from "../../states/category";
import {initialPage} from "../constant";
import {CategoryActionTypes} from "../../actions/category";
import {SET_CATEGORIES} from "../../types/category";

const initialState: CategoryState = {
    pageOfCategory: initialPage
}

export const categoryReducer = (state = initialState, action: CategoryActionTypes): CategoryState => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {...state, pageOfCategory: action.payload}
        default:
            return state
    }
}

export default categoryReducer