import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import {purchaseOrderApiService} from "../../../apiservice/purchase-order";
import DataTable from "react-data-table-component";
import '@styles/react/libs/tables/react-dataTable-component.scss'
import columnsOfModalImportPurchaseOrder from "./columnsOfModalImportPurchaseOrder";
import {useEffect, useState} from "react";
import {initialPage} from "../../../redux/reducers/constant";
import {Page} from "../../../models/Page";
import {PurchaseOrderStatus} from "../../../models/PurchaseOrderStatus";
import {ChevronDown} from "react-feather";
import TablePagination from "../../component/TablePagination";
import PurchaseTableHeader from "./PurchaseTableHeader";

interface ModalImportPurchaseOrderProps {
    isOpen: boolean
    toggleModal: () => void
    toggleHeader: () => void
    onSelectPurchaseOrder: (purchaseOrder: PurchaseOrder) => void
}


const ModalImportPurchaseOrder = (props: ModalImportPurchaseOrderProps) => {

    const {isOpen, toggleModal, toggleHeader, onSelectPurchaseOrder} = props

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState("createdDate,asc")
    const [status, setStatus] = useState<PurchaseOrderStatus | null>(null)
    const statuses: PurchaseOrderStatus[] = ["APPROVED"]

    const [pageOfPurchaseOrder, setPageOfPurchaseOrder] = useState<Page<PurchaseOrder>>(initialPage)

    const getPurchaseOrders = (params) => {
        purchaseOrderApiService.getPurchaseOrders({
            page: params.page,
            size: params.size,
            sort: params.sort,
            status: params.status,
            code: params.code,
            statuses: statuses
        })
            .then(response => {
                setPageOfPurchaseOrder(response.data.data)
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const initialLoadData = () => {
        getPurchaseOrders({
            page: currentPage,
            size: rowsPerPage,
            sort: sort,
            status: status,
            code: searchTerm,
            statuses: statuses
        })
    }

    useEffect(() => {
        initialLoadData()
    }, [])

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        getPurchaseOrders({
            page: page.selected,
            size: rowsPerPage,
            sort: sort,
            status: status,
            code: searchTerm,
            statuses: statuses
        })
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)

        getPurchaseOrders({
            page: currentPage,
            size: value,
            sort: sort,
            status: status,
            code: searchTerm,
            statuses: statuses
        })

    }

    const handleFilter = val => {
        setSearchTerm(val)
        getPurchaseOrders({
            page: currentPage,
            size: rowsPerPage,
            sort: sort,
            status: status,
            code: val,
            statuses: statuses
        })
    }

    const dataToRender = () => {
        return pageOfPurchaseOrder.content.map((item, index) => ({
            no: index + 1 + pageOfPurchaseOrder.pageable.offset,
            ...item,
        }))
    }


    const handleFilterByStatus = (value: PurchaseOrderStatus | null) => () => {
        setStatus(value)
        getPurchaseOrders({
            page: currentPage,
            size: rowsPerPage,
            sort: sort,
            status: value,
            code: searchTerm
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            autoFocus={false}
            toggle={toggleModal}
            className="modal-lg"
        >
            <ModalHeader toggle={toggleHeader}>Import Pesanan Pembelian</ModalHeader>
            <ModalBody>
                <DataTable
                    onRowClicked={(row, event) => {
                        onSelectPurchaseOrder(row)
                    }}
                    highlightOnHover
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={columnsOfModalImportPurchaseOrder}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfPurchaseOrder, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <PurchaseTableHeader
                            innerRef={null}
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

export default ModalImportPurchaseOrder