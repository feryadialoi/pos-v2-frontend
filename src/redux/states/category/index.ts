import {Page} from "../../../models/page";
import {Category} from "../../../models/Category";

export interface CategoryState {
    pageOfCategory: Page<Category>
}