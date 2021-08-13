import {DefaultUnit} from "../Product";

export interface UpdateProductRequest {
    name?: string | null
    defaultUnit?: DefaultUnit | null
}