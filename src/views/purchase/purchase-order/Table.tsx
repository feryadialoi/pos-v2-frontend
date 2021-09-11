import {Dispatch, Fragment, useEffect, useState} from "react"
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Input,
    Label,
    ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";
import {Page} from "../../../models/Page";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/states/root";
import {columns} from "./columns";
import {Archive, ChevronDown, FileText, Trash2} from "react-feather";
import TablePagination from "../../component/TablePagination";
import DataTable from "react-data-table-component";
import {Item, Menu, useContextMenu} from "react-contexify";
import {notifySuccess} from "../../component/SuccessToast";
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import PurchaseOrderTableHeader from "./PurchaseOrderTableHeader";
import {useHistory} from "react-router-dom";
import {purchaseOrderApiService} from "../../../apiservice/purchase-order";
import {setPageOfPurchaseOrder} from "../../../redux/actions/purchase-order";
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import {PurchaseOrderStatus} from "../../../models/PurchaseOrderStatus";
import classNames from "classnames";
import classnames from "classnames";
import {Indonesian} from "flatpickr/dist/l10n/id";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {dateOfDayMonthYear, formatDateToCommonFormat} from "../../../utility/date-format-util";

const PurchaseOrdersList = () => {

    // dateOfDayMonthYear(new Date())
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState("createdDate,desc")
    const [status, setStatus] = useState<PurchaseOrderStatus | null>(null)

    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrder | null>(null)

    const pageOfPurchaseOrder: Page<PurchaseOrder> = useSelector<RootState, Page<PurchaseOrder>>(state => state.purchaseOrder.pageOfPurchaseOrder)
    const dispatch = useDispatch()
    const history = useHistory()

    const getPurchaseOrders = (params) => {
        purchaseOrderApiService.getPurchaseOrders({
            page: params.page,
            size: params.size,
            sort: params.sort,
            status: params.status,
            startDate: params.startDate,
            endDate: params.endDate
        })
            .then(response => {
                dispatch(setPageOfPurchaseOrder(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const initialLoadData = () => {

        const params = {
            page: currentPage,
            size: rowsPerPage,
            status: status,
            sort: sort,
        }

        if (startDate) params["startDate"] = formatDateToCommonFormat(startDate)
        if (endDate) params["endDate"] = formatDateToCommonFormat(endDate)

        console.log(params)
        getPurchaseOrders(params)
    }

    useEffect(() => {
        initialLoadData()
    }, [])

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        const params = {
            page: page.selected,
            size: rowsPerPage,
            status: status,
            sort: sort,
        }

        if (startDate) params["startDate"] = formatDateToCommonFormat(startDate)
        if (endDate) params["endDate"] = formatDateToCommonFormat(endDate)

        getPurchaseOrders(params)
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)

        const params = {
            page: currentPage,
            size: value,
            status: status,
            sort: sort,
        }

        if (startDate) params["startDate"] = formatDateToCommonFormat(startDate)
        if (endDate) params["endDate"] = formatDateToCommonFormat(endDate)

        getPurchaseOrders(params)

    }

    const handleFilter = val => {
        setSearchTerm(val)
        const params = {
            page: currentPage,
            size: rowsPerPage,
            status: status,
            sort: sort,
        }
        if (startDate) params["startDate"] = formatDateToCommonFormat(startDate)
        if (endDate) params["endDate"] = formatDateToCommonFormat(endDate)

        getPurchaseOrders(params)
    }

    const dataToRender = () => {
        return pageOfPurchaseOrder.content.map((item, index) => ({
            no: index + 1 + pageOfPurchaseOrder.pageable.offset,
            ...item,
        }))
    }


    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    const addPurchaseOrder = () => {
        history.push("/purchase-orders/add")
    }

    const gotoPurchaseOrderViewPage = () => {
        history.push("/purchase-orders/view/" + selectedPurchaseOrder?.id)
    }

    const handleFilterByStatus = (value: PurchaseOrderStatus | null) => () => {
        setStatus(value)

        const params = {
            page: currentPage,
            size: rowsPerPage,
            status: value,
            sort: sort,
        }

        if (startDate) params["startDate"] = formatDateToCommonFormat(startDate)
        if (endDate) params["endDate"] = formatDateToCommonFormat(endDate)

        getPurchaseOrders(params)
    }

    const handleOnChangeDate = (dispatch: Dispatch<Date | null>, dateField: string) => (value: Date[]) => {
        dispatch(value[0])

        const params = {
            page: currentPage,
            size: rowsPerPage,
            status: status,
            sort: sort,
        }

        if (startDate) params["startDate"] = formatDateToCommonFormat(startDate)
        if (endDate) params["endDate"] = formatDateToCommonFormat(endDate)

        getPurchaseOrders({
            ...params,
            [dateField]: formatDateToCommonFormat(value[0])
        })
    }

    const handleOnClickResetFilter = () => {
        setStartDate(null)
        setEndDate(null)

        getPurchaseOrders({
            page: currentPage,
            size: rowsPerPage,
            status: status,
            sort: sort,
        })
    }


    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle tag='h4'>Filter Pencarian</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Periode Awal</Label>
                                <Flatpickr
                                    value={startDate}
                                    onChange={handleOnChangeDate(setStartDate, "startDate")}
                                    id='startDate'
                                    className={classnames('form-control', {'is-invalid': false})}
                                    options={{
                                        locale: Indonesian,
                                        altInput: true,
                                        altFormat: 'j F Y',
                                        dateFormat: 'Y-m-d',
                                        // minDate: entryDate.entryDate,
                                        allowInput: true
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Periode Akhir</Label>
                                <Flatpickr
                                    value={endDate}
                                    onChange={handleOnChangeDate(setEndDate, "endDate")}
                                    id='hf-picker'
                                    className={classnames('form-control', {'is-invalid': false})}
                                    options={{
                                        locale: Indonesian,
                                        altInput: true,
                                        altFormat: 'j F Y',
                                        dateFormat: 'Y-m-d',
                                        minDate: startDate,
                                        allowInput: true
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <Button color="primary" outline className="mt-2" onClick={handleOnClickResetFilter}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col md={12}>
                        </Col>
                        <Col>
                            <ListGroup className='list-group-horizontal-sm'>
                                <ListGroupItem
                                    className={classNames({"active": status == null})}
                                    onClick={handleFilterByStatus(null)}>
                                    Semua
                                </ListGroupItem>
                                <ListGroupItem
                                    className={classNames({"active": status == "DRAFT"})}
                                    onClick={handleFilterByStatus("DRAFT")}>
                                    Draft
                                </ListGroupItem>
                                <ListGroupItem
                                    className={classNames({"active": status == "APPROVED"})}
                                    onClick={handleFilterByStatus("APPROVED")}>
                                    Disetujui
                                </ListGroupItem>
                                <ListGroupItem
                                    className={classNames({"active": status == "AWAITING_APPROVAL"})}
                                    onClick={handleFilterByStatus("AWAITING_APPROVAL")}>
                                    Tunggu Persetujuan
                                </ListGroupItem>
                                <ListGroupItem
                                    className={classNames({"active": status == "REFUSED"})}
                                    onClick={handleFilterByStatus("REFUSED")}>
                                    Ditolak
                                </ListGroupItem>
                                <ListGroupItem
                                    className={classNames({"active": status == "COMPLETE"})}
                                    onClick={handleFilterByStatus("COMPLETE")}>
                                    Selesai
                                </ListGroupItem>
                                <ListGroupItem
                                    className={classNames({"active": status == "VOID"})}
                                    onClick={handleFilterByStatus("VOID")}>
                                    Void
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
                <DataTable
                    onRowClicked={(row, event) => {
                        setSelectedPurchaseOrder(row)
                        show(event)
                    }}
                    highlightOnHover
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={columns}
                    sortIcon={<ChevronDown/>}
                    onSort={(row) => {
                        console.log('sort', row)
                    }}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfPurchaseOrder, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <PurchaseOrderTableHeader
                            innerRef={null}
                            onClickAdd={addPurchaseOrder}
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />

                <Menu id='menu_id'>
                    <Item
                        onClick={() => {
                            gotoPurchaseOrderViewPage()
                        }}>
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Details</span></Item>
                    <Item
                        onClick={() => {
                        }}>
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </Item>
                    <Item onClick={() => handleClick('Option 2')}>
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </Item>
                </Menu>
            </Card>
        </Fragment>
    )
}

export default PurchaseOrdersList