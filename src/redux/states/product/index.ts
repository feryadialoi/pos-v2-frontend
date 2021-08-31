import {Page} from "../../../models/Page";
import {Product} from "../../../models/Product";

export interface ProductState {
    products: Page<Product>
}