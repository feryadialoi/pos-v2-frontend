import {SET_PAGE_OF_CATEGORY} from "../../types/category";
import {Page} from "../../../models/Page";
import {Category} from "../../../models/Category";

interface SetPageOfCategory {
    type: typeof SET_PAGE_OF_CATEGORY
    payload: Page<Category>
}

export type CategoryActionTypes = SetPageOfCategory

export const setPageOfCategory = (payload: Page<Category>): CategoryActionTypes => {

    return ({type: SET_PAGE_OF_CATEGORY, payload})
}
