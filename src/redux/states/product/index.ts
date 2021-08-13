import {Page} from "../../../models/page";
import {Product} from "../../../models/Product";

export interface ProductState {
    products: Page<Product>
}