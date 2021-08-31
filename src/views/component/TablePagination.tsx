import {Page} from "../../models/Page";
import ReactPaginate from "react-paginate";

const TablePagination = <T, >(pageOfData: Page<T>, currentPage: number, handlePagination: (page) => void) => {
    return (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            pageCount={pageOfData.totalPages || 1}
            activeClassName='active'
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
            marginPagesDisplayed={0}
            pageRangeDisplayed={10}
        />
    )
}

export default TablePagination