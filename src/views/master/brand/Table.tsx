import {Button, Card, Col, CustomInput, Input, Label, Row} from "reactstrap";
import {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../../../models/page";
import {RootState} from "../../../redux/states/root";
import {useHotkeys} from "react-hotkeys-hook";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {Archive, ChevronDown, FileText, Trash2} from "react-feather";
import {columns} from "./columns";
import {Category} from "../../../models/Category";
import {toast} from "react-toastify";
import SuccessToast, {notifySuccess} from "../../component/SuccessToast";
import ErrorToast from "../../component/ErrorToast";
import {Brand} from "../../../models/Brand";
import {brandApiService} from "../../../apiservice/brand";
import {setBrands} from "../../../redux/actions/brand";
import ModalAddBrand from "./ModalAddBrand";
import ModalUpdateBrand from "./ModalUpdateBrand";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'

interface CustomHeaderProps {
    toggleModal: any
    handlePerPage: any
    rowsPerPage: any
    handleFilter: any
    searchTerm: any
    innerRef?: any
}

// ** Table Header
const CustomHeader = (props: CustomHeaderProps) => {

    const {toggleModal, handlePerPage, rowsPerPage, handleFilter, searchTerm, innerRef} = props

    return (
        <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
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
                    <Button color='primary' onClick={toggleModal}>
                        Tambah Merk
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

const BrandsList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [isModalAddBrandVisible, setIsModalAddBrandVisible] = useState(false)
    const [isModalUpdateBrandVisible, setIsModalUpdateBrandVisible] = useState(false)

    const [brandToUpdate, setBrandToUpdate] = useState<Brand>({id: "", name: ""})

    const [timer, setTimer] = useState<any>(null)

    const pageOfBrand: Page<Category> = useSelector<RootState, Page<Brand>>(state => state.brand.pageOfBrand)

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });
    useHotkeys("ctrl+b", () => {
        setSidebarOpen(true)
    })
    useHotkeys("esc", () => {
        setSidebarOpen(false)
    })


    // ** Function to toggle sidebar
    const toggleModalAddBrand = () => setIsModalAddBrandVisible(!isModalAddBrandVisible)


    const initialLoadData = () => {

        brandApiService.getBrands({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setBrands(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Get data on mount
    useEffect(() => {
        initialLoadData()
    }, [])


    // ** Function in get data on page change
    const handlePagination = page => {

        console.log(page)
        setCurrentPage(page.selected + 1)

        brandApiService.getBrands({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setBrands(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })

    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)

        setRowsPerPage(value)

        brandApiService.getBrands({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setBrands(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // const debounce = (job: () => void, delay: number) => {
    //     return () => {
    //         clearTimeout(timer)
    //         setTimer(
    //             setTimeout(() => job(), delay)
    //         )
    //     }
    // }


    // ** Function in get data on search query change
    const handleFilter = val => {

        setSearchTerm(val)

        brandApiService.getBrands({
            page: currentPage,
            size: currentPage * rowsPerPage,
            name: val,
            sort: sort
        })
            .then((response) => {
                dispatch(setBrands(response.data.data))

            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Custom Pagination
    const CustomPagination = () => {

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={pageOfBrand.totalPages || 1}
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

    // ** Table data to render
    const dataToRender = () => {
        return pageOfBrand.content.map((item, index) => ({
            no: index + 1 + pageOfBrand.pageable.offset,
            ...item,
        }))
    }

    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }


    return (
        <Fragment>
            <ModalAddBrand
                isOpen={isModalAddBrandVisible}
                modalToggle={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                headerToggle={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                onClick={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                onClose={() => {
                    setIsModalAddBrandVisible(false)
                    initialLoadData()
                }}
            />

            <ModalUpdateBrand
                brand={brandToUpdate}
                isOpen={isModalUpdateBrandVisible}
                modalToggle={() => setIsModalUpdateBrandVisible(!isModalUpdateBrandVisible)}
                headerToggle={() => setIsModalUpdateBrandVisible(!isModalUpdateBrandVisible)}
                onClick={() => setIsModalUpdateBrandVisible(!isModalUpdateBrandVisible)}
                onClose={() => {
                    setIsModalUpdateBrandVisible(false)
                    initialLoadData()
                }}
            />

            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        setBrandToUpdate({
                            id: row.id,
                            name: row.name
                        })
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
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomHeader
                            innerRef={searchTermInputRef}
                            toggleModal={toggleModalAddBrand}
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
                            setIsModalUpdateBrandVisible(true)
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

export default BrandsList