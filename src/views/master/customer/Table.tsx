import {Card} from "reactstrap";
import {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../../../models/Page";
import {RootState} from "../../../redux/states/root";
import {useHotkeys} from "react-hotkeys-hook";
import DataTable from "react-data-table-component";
import {Archive, ChevronDown, FileText, Trash2} from "react-feather";
import {columns} from "./columns";
import {notifySuccess} from "../../component/SuccessToast";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import TablePagination from "../../component/TablePagination";
import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableActionButton from "../../component/table-action-button";
import {useModalDeleteConfirmation} from "../../component/ModalDeleteConfirmation";
import {notifyError} from "../../component/ErrorToast";
import ModalAddCustomer from "./ModalAddCustomer";
import ModalUpdateCustomer from "./ModalUpdateCustomer";
import {Customer} from "../../../models/Customer";
import {customerApiService} from "../../../apiservice/customer";
import {setPageOfCustomer} from "../../../redux/actions/customer";
import CustomerTableHeader from "./CustomerTableHeader";

const CustomersList = () => {
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

    const [customerToUpdate, setCustomerToUpdate] = useState<Customer>({
        id: "",
        name: "",
        nationalIdentificationNumber: "",
        address: "",
        phone: "",
        phone2: "",
        description: ""
    })

    const [customerToDelete, setCustomerToDelete] = useState<Customer>({
        id: "",
        name: "",
        nationalIdentificationNumber: "",
        address: "",
        phone: "",
        phone2: "",
        description: ""
    })

    const [timer, setTimer] = useState<any>(null)

    const pageOfCustomer: Page<Customer> = useSelector<RootState, Page<Customer>>(state => state.customer.pageOfCustomer)

    const [isDeleteModalVisible, setIsDeleteModalVisible, message, setMessage, showDeleteModal, ModalDeleteConfirm] = useModalDeleteConfirmation()

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
        customerApiService.getCustomers({
            page: 0,
            size: rowsPerPage,
            sort: sort
        }).then(response => {
            dispatch(setPageOfCustomer(response.data.data))
        }).catch(error => {
            console.error(error)
        })
    }

    // ** Get data on mount
    useEffect(() => {
        initialLoadData()
    }, [])


    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        customerApiService.getCustomers({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfCustomer(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        customerApiService.getCustomers({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfCustomer(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        customerApiService.getCustomers({
            page: currentPage,
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfCustomer(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Table data to render
    const dataToRender = () => {
        return pageOfCustomer.content.map((item, index) => ({
            no: index + 1 + pageOfCustomer.pageable.offset,
            ...item,
        }))
    }

    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    const deleteCustomer = () => {
        customerApiService.deleteCustomer(customerToDelete.id)
            .then(response => {
                notifySuccess(customerToDelete.name + " Berhasil dihapus")
                initialLoadData()
            })
            .catch(error => {
                notifyError("Gagal hapus " + customerToDelete.name)
            })
    }


    return (
        <Fragment>

            <ModalDeleteConfirm
                isOpen={isDeleteModalVisible}
                toggleModal={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                toggleHeader={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                onClickDelete={() => {
                    deleteCustomer()
                }}
                onClickCancel={() => {

                }}
                data={customerToDelete.name}
            />

            <ModalAddCustomer
                isOpen={isModalAddBrandVisible}
                modalToggle={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                headerToggle={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                onClick={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                onClose={() => {
                    setIsModalAddBrandVisible(false)
                    initialLoadData()
                }}
            />

            <ModalUpdateCustomer
                customer={customerToUpdate}
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
                        setCustomerToUpdate(row)

                        setCustomerToDelete(row)

                        show(event)
                    }}
                    highlightOnHover
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={[...columns, {
                        name: "Aksi", cell: (row) => <TableActionButton
                            hasAuthorityToEdit
                            useEdit
                            onClickEdit={() => {
                                setIsModalUpdateBrandVisible(true)
                                setCustomerToUpdate(row)
                            }}

                            useDelete
                            hasAuthorityToDelete
                            onClickDelete={() => {
                                showDeleteModal(row.name)
                                setCustomerToDelete(row)
                            }}
                        />
                    }]}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfCustomer, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CustomerTableHeader
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
                    <Item
                        onClick={() => {
                        }}>
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Details</span></Item>
                    <Item
                        onClick={() => {
                            setIsModalUpdateBrandVisible(true)
                        }}>
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </Item>
                    <Item
                        onClick={() => {
                            showDeleteModal(customerToDelete.name)
                        }}>
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </Item>
                </Menu>

            </Card>
        </Fragment>
    )
}

export default CustomersList