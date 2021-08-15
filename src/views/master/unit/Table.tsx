// ** React Imports
import {Fragment, useState, useEffect, useRef} from 'react'

// ** Invoice List Sidebar
import SidebarAddUnit from './SidebarAddUnit'

// ** Columns
import {columns} from './columns'

// ** Store & Actions
import {useDispatch, useSelector} from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import {Archive, Check, ChevronDown, FileText, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
// @ts-ignore
import {selectThemeColors} from '@utils'
import {
    Card,
    Input,
    Row,
    Col,
    Label,
    CustomInput,
    Button,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Page} from "../../../models/page";
import {unitApiService} from "../../../apiservice/unit";
import {useHotkeys} from "react-hotkeys-hook";
import {setUnits} from "../../../redux/actions/unit";
import {RootState} from "../../../redux/states/root";
import {Unit} from "../../../models/Unit";
// @ts-ignore
import Avatar from '@components/avatar'
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import ModalAddUnit from "./ModalAddUnit";
import ModalUpdateUnit from "./ModalUpdateUnit";
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
                        Tambah Satuan
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

const ToastContent = ({text}) => (
    <Fragment>
        <div className='toastify-header pb-0'>
            <div className='title-wrapper'>
                <Avatar size='sm' color='success' icon={<Check/>}/>
                <h6 className='toast-title'>Clicked {text}</h6>
            </div>
        </div>
    </Fragment>
)


const UnitsList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isModalAddUnitVisible, setIsModalAddUnitVisible] = useState(false)
    const [isModalUpdateUnitVisible, setIsModalUpdateUnitVisible] = useState(false)
    const [unitToUpdate, setUnitToUpdate] = useState<Unit>({id: "", name: ""})

    const [timer, setTimer] = useState<any>(null)

    const pageOfUnit: Page<Unit> = useSelector<RootState, Page<Unit>>(state => state.unit.pageOfUnit)

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
    const toggleModalAddUnit = () => setIsModalAddUnitVisible(true)

    // ** initially load data
    const initialLoadData = () => {
        unitApiService.getUnits({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setUnits(response.data.data))
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
        setCurrentPage(page.selected + 1)

        unitApiService.getUnits({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setUnits(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        unitApiService.getUnits({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setUnits(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        unitApiService.getUnits({
            page: currentPage,
            size: currentPage * rowsPerPage,
            name: val,
            sort: sort
        })
            .then(response => {
                dispatch(setUnits(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Custom Pagination
    const CustomPagination = () => {

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={pageOfUnit.totalPages || 1}
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
        return pageOfUnit.content.map((item, index) => ({
            no: index + 1 + pageOfUnit.pageable.offset,
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
            <ModalUpdateUnit
                unit={unitToUpdate}
                isOpen={isModalUpdateUnitVisible}
                modalToggle={() => setIsModalUpdateUnitVisible(!isModalUpdateUnitVisible)}
                headerToggle={() => setIsModalUpdateUnitVisible(!isModalUpdateUnitVisible)}
                onClick={() => setIsModalUpdateUnitVisible(!isModalUpdateUnitVisible)}
                onClose={() => {
                    setIsModalUpdateUnitVisible(false)
                    initialLoadData()
                }}
            />
            <ModalAddUnit
                isOpen={isModalAddUnitVisible}
                modalToggle={() => setIsModalAddUnitVisible(!isModalAddUnitVisible)}
                headerToggle={() => setIsModalAddUnitVisible(!isModalAddUnitVisible)}
                onClick={() => setIsModalAddUnitVisible(!isModalAddUnitVisible)}
                onClose={() => {
                    setIsModalAddUnitVisible(false)
                    initialLoadData()
                }}
            />
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        setUnitToUpdate({
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
                    onSort={(row) => {
                        console.log('sort', row)
                    }}
                    className='react-dataTable'
                    paginationComponent={CustomPagination}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomHeader
                            innerRef={searchTermInputRef}
                            toggleModal={toggleModalAddUnit}
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
                            setIsModalUpdateUnitVisible(true)
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

            <SidebarAddUnit
                onCreateSuccess={() => {
                    console.log("on create success")
                    initialLoadData()
                }}
                closeOnSuccess={() => {
                    notifySuccess()
                    setSidebarOpen(false)
                }}
                closeOnError={(message) => {
                    notifyError(message)
                }}
                open={sidebarOpen}
                toggleSidebar={toggleModalAddUnit}
            />
        </Fragment>
    )
}

export default UnitsList