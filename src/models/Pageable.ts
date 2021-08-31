import {PageSort} from "./PageSort";

export interface Pageable {
    sort: PageSort
    offset: number
    pageSize: number
    pageNumber: number
    unpaged: boolean
    paged: boolean
}