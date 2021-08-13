import {PageSort} from "./page-sort";

export interface Pageable {
    sort: PageSort
    offset: number
    pageSize: number
    pageNumber: number
    unpaged: boolean
    paged: boolean
}