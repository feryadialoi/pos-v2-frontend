import {Col, CustomInput, Input, Label, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Product} from "../../../models/Product";
import {useEffect, useState} from "react";
import {Page} from "../../../models/Page";
import {initialPage} from "../../../redux/reducers/constant";
import {productApiService} from "../../../apiservice/product";
import {notifySuccess} from "../SuccessToast";
import DataTable from "react-data-table-component";
import {ChevronDown} from "react-feather";
import TablePagination from "../TablePagination";
import columnsOfProduct from "./columns";
import ProductTableHeader from "./ProductTableHeader";

interface ModalSelectProductProps {
    isOpen: boolean
    toggleModal: () => void
    toggleHeader: () => void
    onSelect: (product: Product) => void
}

const ModalSelectProduct = ({isOpen, toggleModal, toggleHeader, onSelect}: ModalSelectProductProps) => {

    const [pageOfProduct, setPageOfProduct] = useState<Page<Product>>(initialPage)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")

    useEffect(() => {
        initialLoadData()
        resetData()
    }, [isOpen])


    const initialLoadData = () => {
        productApiService.getProducts({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                setPageOfProduct(response.data.data)
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        productApiService.getProducts({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                setPageOfProduct(response.data.data)
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    const handlePerPage = e => {

        const value = parseInt(e.currentTarget.value)

        console.log(value)

        setRowsPerPage(value)

        productApiService.getProducts({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                setPageOfProduct(response.data.data)
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }


    const handleFilter = val => {
        console.log(val)
        setSearchTerm(val)

        productApiService.getProducts({
            page: currentPage,
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then((response) => {

                setPageOfProduct(response.data.data)

            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }


    const handleClick = text => {
        notifySuccess(text)
    }

    const dataToRender = () => {
        return pageOfProduct.content.map((item, index) => ({
            no: index + 1 + pageOfProduct.pageable.offset,
            ...item,
        }))
    }

    const resetData = () => {
        setPageOfProduct(initialPage)
        setSearchTerm("")
        setCurrentPage(0)
        setRowsPerPage(10)
        setSort("createdDate,asc")
    }

    return (
        <Modal
            autoFocus={false}
            className="modal-lg"
            scrollable
            isOpen={isOpen}
            toggle={toggleModal}
        >
            <ModalHeader toggle={toggleHeader}>Pilih Produk</ModalHeader>
            <ModalBody>
                <DataTable
                    onRowClicked={(row, event) => {
                        onSelect(row)
                    }}
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfProduct, currentPage, handlePagination)}
                    highlightOnHover
                    columns={columnsOfProduct}
                    data={dataToRender()}
                    subHeaderComponent={
                        <ProductTableHeader
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />
            </ModalBody>
        </Modal>
    )
}

export default ModalSelectProduct