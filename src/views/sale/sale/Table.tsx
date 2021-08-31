import {Fragment, useEffect, useState} from "react"
import {Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";
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
import {useHistory} from "react-router-dom";
import {Mapping} from "../../../models/Mapping";
import SaleTableHeader from "./SaleTableHeader";
import {Sale} from "../../../models/Sale";
import {saleApiService} from "../../../apiservice/sale";
import {setPageOfSale} from "../../../redux/actions/sale";

const SalesList = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState("createdDate,asc")

    const pageOfSale: Page<Sale> = useSelector<RootState, Page<Sale>>(state => state.sale.pageOfSale)
    const dispatch = useDispatch()
    const history = useHistory()

    const getSales = (params: Mapping) => {
        saleApiService.getSales({
            page: params.page,
            size: params.size,
            sort: params.sort,
        })
            .then((response) => {
                dispatch(setPageOfSale(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    const initialLoadData = () => {
        getSales({
            page: currentPage,
            size: rowsPerPage,
            sort: sort
        })
    }

    useEffect(() => {
        initialLoadData()
    }, [])

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        getSales({
            page: page.selected,
            size: rowsPerPage,
            sort: sort
        })
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        getSales({
            page: currentPage,
            size: value,
            sort: sort
        })
    }

    const handleFilter = val => {
        setSearchTerm(val)
        getSales({
            page: currentPage,
            size: rowsPerPage,
            sort: sort
        })
    }

    const dataToRender = () => {
        return pageOfSale.content.map((item, index) => ({
            no: index + 1 + pageOfSale.pageable.offset,
            ...item,
        }))
    }


    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    const addSale = () => {
        history.push("/sales/add")
    }

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Tanggal Mulai</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Tanggal Mulai</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Kode</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
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
                    paginationComponent={() => TablePagination(pageOfSale, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <SaleTableHeader
                            innerRef={null}
                            onClickAdd={addSale}
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />

                <Menu id='menu_id'>
                    <Item onClick={() => handleClick('Option 1')}>
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

export default SalesList