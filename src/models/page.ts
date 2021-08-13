import {PageSort} from "./page-sort";
import {Pageable} from "./pageable";

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
