// ** React Imports
import {Fragment, useState, useEffect, useRef} from 'react'


// ** Columns
import {columns} from './columns'

// ** Store & Actions
import {useDispatch, useSelector} from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import {Archive, Check, ChevronDown, FileText, Loader, Trash2, X} from 'react-feather'
import DataTable from 'react-data-table-component'
// @ts-ignore
import {selectThemeColors} from '@utils'
import {Card, CardHeader, CardTitle, CardBody, Input, Row, Col, Label, CustomInput, Button} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Page} from "../../../models/Page";
import {unitApiService} from "../../../apiservice/unit";
import {useHotkeys} from "react-hotkeys-hook";
import {setPageOfUnit} from "../../../redux/actions/unit";
import {RootState} from "../../../redux/states/root";
import {Product} from "../../../models/Product";
import {Unit} from "../../../models/Unit";
// @ts-ignore
import Avatar from '@components/avatar'
import {toast} from "react-toastify";
import SuccessToast, {notifySuccess} from "../../component/SuccessToast";
import ErrorToast from "../../component/ErrorToast";
import ModalAddSupplier from "./ModalAddSupplier";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import ModalUpdateSupplier from "./ModalUpdateSupplier";
import {Supplier} from "../../../models/Supplier";
import {supplierApiService} from "../../../apiservice/supplier";
import {setPageOfSupplier} from "../../../redux/actions/supplier";
import TablePagination from "../../component/TablePagination";
import SupplierTableHeader from "./SupplierTableHeader";


const SuppliersList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [isModalAddSupplierVisible, setIsModalAddSupplierVisible] = useState(false)
    const [isModalUpdateSupplierVisible, setIsModalUpdateSupplierVisible] = useState(false)

    const [supplierToUpdate, setSupplierToUpdate] = useState<Supplier>({
        id: '', code: '', name: '', address: '',
        pic: '', phone: '', email: '',
        bankName: '', bankBranch: '', bankAccountNumber: '',
        taxableFirmName: '', taxableFirmAddress: '', taxIdentificationNumber: ''
    })

    const pageOfSupplier: Page<Supplier> = useSelector<RootState, Page<Supplier>>(state => state.supplier.pageOfSupplier)

    const [timer, setTimer] = useState<any>(null)


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
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const initialLoadData = () => {
        supplierApiService.getSuppliers({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfSupplier(response.data.data))
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

        supplierApiService.getSuppliers({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfSupplier(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        supplierApiService.getSuppliers({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfSupplier(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        supplierApiService.getSuppliers({
            page: currentPage,
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfSupplier(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Table data to render
    const dataToRender = () => {
        return pageOfSupplier.content.map((item, index) => ({
            no: index + 1 + pageOfSupplier.pageable.offset,
            ...item,
        }))
    }

    const notifySuccess = (message?: string) => toast.success(<SuccessToast
        message={message}/>, {hideProgressBar: true})

    const notifyError = (message?: string) => toast.error(<ErrorToast message={message}/>, {hideProgressBar: true})


    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    return (
        <Fragment>

            <ModalUpdateSupplier
                supplier={supplierToUpdate}
                isOpen={isModalUpdateSupplierVisible}
                modalToggle={() => setIsModalUpdateSupplierVisible(!isModalUpdateSupplierVisible)}
                headerToggle={() => setIsModalUpdateSupplierVisible(!isModalUpdateSupplierVisible)}
                onClick={() => setIsModalUpdateSupplierVisible(!isModalUpdateSupplierVisible)}
                onSuccess={() => {
                    setIsModalUpdateSupplierVisible(false)
                    initialLoadData()
                }}
            />

            <ModalAddSupplier
                isOpen={isModalAddSupplierVisible}
                modalToggle={() => setIsModalAddSupplierVisible(!isModalAddSupplierVisible)}
                headerToggle={() => setIsModalAddSupplierVisible(!isModalAddSupplierVisible)}
                onClick={() => setIsModalAddSupplierVisible(!isModalAddSupplierVisible)}
                onSuccess={() => {
                    setIsModalAddSupplierVisible(false)
                    initialLoadData()
                }}
            />

            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        setSupplierToUpdate(row)
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
                    paginationComponent={() => TablePagination(pageOfSupplier, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <SupplierTableHeader
                            innerRef={searchTermInputRef}
                            toggleModal={() => {
                                setIsModalAddSupplierVisible(true)
                            }}
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
                            setIsModalUpdateSupplierVisible(true)
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

export default SuppliersList