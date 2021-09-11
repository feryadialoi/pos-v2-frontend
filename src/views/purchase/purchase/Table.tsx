// @ts-ignore
import {selectThemeColors} from '@utils'
// @ts-ignore
import Avatar from '@components/avatar'
// ** React Imports
import {Fragment, useState, useEffect, useRef} from 'react'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Columns
import {columns} from './columns'

// ** Store & Actions
import {useDispatch, useSelector} from 'react-redux'

// ** Third Party Components
import {Archive, Check, ChevronDown, FileText, Trash, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Label,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Page} from "../../../models/Page";
import {useHotkeys} from "react-hotkeys-hook";
import {RootState} from "../../../redux/states/root";
import {Unit} from "../../../models/Unit";
import {notifySuccess} from "../../component/SuccessToast";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import TablePagination from "../../component/TablePagination";
import PurchaseTableHeader from "./PurchaseTableHeader";
import {GetPurchasesParams, purchaseApiService} from "../../../apiservice/purchase";
import {setPageOfPurchase} from "../../../redux/actions/purchase";
import {Purchase} from "../../../models/Purchase";
import {Mapping} from "../../../models/Mapping";
import {useHistory} from "react-router-dom";
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import classNames from "classnames";
import {PurchaseStatus} from "../../../models/PurchaseStatus";
import classnames from "classnames";
import {Indonesian} from "flatpickr/dist/l10n/id";


const PurchasesList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()
    const history = useHistory()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [status, setStatus] = useState<PurchaseStatus | null>(null)

    const pageOfPurchase: Page<Purchase> = useSelector<RootState, Page<Purchase>>(state => state.purchase.pageOfPurchase)

    const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });

    useHotkeys("ctrl+b", () => {
        console.log("ctrl+b")
    })

    const getPurchases = (params: Mapping & GetPurchasesParams) => {
        purchaseApiService.getPurchases({
            page: params.page,
            size: params.size,
            sort: params.sort,
            status: params.status
        })
            .then(response => {
                dispatch(setPageOfPurchase(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** initially load data
    const initialLoadData = () => {
        getPurchases({
            page: 0,
            size: rowsPerPage,
            sort: sort
        })
    }

    // ** Get data on mount
    useEffect(() => {
        initialLoadData()
    }, [])


    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        getPurchases({
            page: page.selected,
            size: rowsPerPage,
            sort: sort
        })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        getPurchases({
            page: currentPage,
            size: value,
            sort: sort
        })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        getPurchases({
            page: currentPage,
            size: rowsPerPage,
            sort: sort
        })
    }


    // ** Table data to render
    const dataToRender = () => {
        return pageOfPurchase.content.map((item, index) => ({
            no: index + 1 + pageOfPurchase.pageable.offset,
            ...item,
        }))
    }


    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    const addPurchase = () => {
        history.push("/purchases/add")
    }

    const gotoPurchaseViewPage = () => {
        history.push("/purchases/view/" + selectedPurchase?.id)
    }

    const handleFilterByStatus = (value: PurchaseStatus | null) => () => {
        setStatus(value)
        getPurchases({
            page: currentPage,
            size: rowsPerPage,
            sort: sort,
            status: value
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
                                    // value={dueDate.dueDate}
                                    // onChange={handleOnChangeDueDate}
                                    id='hf-picker'
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
                                    // value={dueDate.dueDate}
                                    // onChange={handleOnChangeDueDate}
                                    id='hf-picker'
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
                        <Col>
                            <Button color="primary" outline className="mt-2">
                                <Trash size={16} className="mr-1"/>Reset Filter
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <ListGroup className='list-group-horizontal-sm'>
                        <ListGroupItem
                            className={classNames({"active": status == null})}
                            onClick={handleFilterByStatus(null)}>
                            Semua
                        </ListGroupItem>
                        <ListGroupItem
                            className={classNames({"active": status == "UNPAID"})}
                            onClick={handleFilterByStatus("UNPAID")}>
                            Belum Dibayar
                        </ListGroupItem>
                        <ListGroupItem
                            className={classNames({"active": status == "PARTIAL_PAID"})}
                            onClick={handleFilterByStatus("PARTIAL_PAID")}>
                            Dibayar Sebagian
                        </ListGroupItem>
                        <ListGroupItem
                            className={classNames({"active": status == "PAID"})}
                            onClick={handleFilterByStatus("PAID")}>
                            Lunas
                        </ListGroupItem>
                        <ListGroupItem
                            className={classNames({"active": status == "VOID"})}
                            onClick={handleFilterByStatus("VOID")}>
                            Void
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
                <DataTable
                    onRowClicked={(row, event) => {
                        setSelectedPurchase(row)
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
                    paginationComponent={() => TablePagination(pageOfPurchase, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <PurchaseTableHeader
                            innerRef={searchTermInputRef}
                            onClickAdd={addPurchase}
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
                            gotoPurchaseViewPage()
                        }}>
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Detail</span></Item>
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

export default PurchasesList