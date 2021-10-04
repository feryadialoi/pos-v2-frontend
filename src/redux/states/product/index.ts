import {Page} from "../../../models/Page";
import {Product} from "../../../models/Product";

export interface ProductState {
    pageOfProduct: Page<Product>
}