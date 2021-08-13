import {Fragment, useEffect, useRef, useState} from "react";
import {Button, Card, Col, CustomInput, Input, Label, Row} from "reactstrap";
import DataTable from 'react-data-table-component'
import {columns} from "./columns";
import {ChevronDown} from "react-feather";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../../../models/page";
import {RootState} from "../../../redux/states/root";
import {Warehouse} from "../../../models/Warehouse";
import {warehouseApiService} from "../../../apiservice/warehouse";
import {setWarehouses} from "../../../redux/actions/warehouse";
import {useHotkeys} from "react-hotkeys-hook";


interface CustomHeaderProps {
    toggleSidebar: any
    handlePerPage: any
    rowsPerPage: any
    handleFilter: any
    searchTerm: any
    innerRef?: any
}

const CustomHeader = (props: CustomHeaderProps) => {
    const {toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm, innerRef} = props

    return (
        <div className=' invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <Label for='rows-per-page'>Show</Label>
                        <CustomInput
                            className='form-control mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{
                                width: '5rem',
                                padding: '0 0.8rem',
                                backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                            }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </CustomInput>
                        <Label for='rows-per-page'>Entries</Label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                        <Label className='mb-0' for='search-invoice'>
                            Search:
                        </Label>
                        <Input
                            innerRef={innerRef}
                            id='search-invoice'
                            className='ml-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>
                    <Button color='primary' onClick={toggleSidebar}>
                        Tambah Gudang
                    </Button>
                </Col>
            </Row>
        </div>
    )
}


const WarehousesList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const pageOfWarehouse: Page<Warehouse> = useSelector<RootState, Page<Warehouse>>(state => state.warehouse.pageOfWarehouse)

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });
    useHotkeys("ctrl+b", () => {
        setSidebarOpen(true)
    })
    useHotkeys("esc", () => {
        setSidebarOpen(false)
    })


    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    useEffect(() => {
        warehouseApiService.getWarehouses({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setWarehouses(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }, [])

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        warehouseApiService.getWarehouses({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setWarehouses(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)

        warehouseApiService.getWarehouses({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setWarehouses(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const handleFilter = val => {
        setSearchTerm(val)
        warehouseApiService.getWarehouses({
            page: currentPage,
            size: currentPage * rowsPerPage,
            name: val,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setWarehouses(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }


    const CustomPagination = () => {
        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={pageOfWarehouse.totalPages || 1}
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

    const dataToRender = () => {
        return pageOfWarehouse.content.map((item, index) => ({
            no: index + 1 + pageOfWarehouse.pageable.offset,
            ...item
        }))
    }


    return (
        <Fragment>
            <Card>
                <DataTable
                    highlightOnHover
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={columns}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomHeader
                            innerRef={searchTermInputRef}
                            toggleSidebar={toggleSidebar}
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />
            </Card>
        </Fragment>
    )
}

export default WarehousesList