import {SET_CATEGORIES} from "../../types/category";
import {Page} from "../../../models/page";
import {Category} from "../../../models/Category";

interface SetCategories {
    type: typeof SET_CATEGORIES
    payload: Page<Category>
}

export type CategoryActionTypes = SetCategories

export const setCategories = (payload: Page<Category>): CategoryActionTypes => {

    return ({type: SET_CATEGORIES, payload})
}
