import {PageSort} from "./PageSort";
import {Pageable} from "./Pageable";

export interface Page<T> {
    content: T[]
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: PageSort
    numberOfElements: number
    first: boolean
    empty: boolean
}
