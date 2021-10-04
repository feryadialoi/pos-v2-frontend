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
import {employeeApiService} from "../../../apiservice/employee";
import SalesmanTableHeader from "./SalesmanTableHeader";
import ModalAddSalesman from "./ModalAddSalesman";
import ModalUpdateSalesman from "./ModalUpdateSalesman";
import {Salesman} from "../../../models/Salesman";
import {salesmanApiService} from "../../../apiservice/salesman";
import {setPageOfSalesman} from "../../../redux/actions/salesman";

const SalesmenList = () => {
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

    const [salesmanToUpdate, setSalesmanToUpdate] = useState<Salesman>({
        id: "",
        name: "",
        phone: "",
        company: {
            id: "",
            bankAccountNumber: "",
            bankName: "",
            name: "",
            bankBranch: "",
            address: "",
            taxableFirmName: "",
            taxableFirmAddress: "",
            taxIdentificationNumber: "",
            phone: ""
        },
        address: "",
        nationalIdentificationNumber: ""
    })
    const [salesmanToDelete, setSalesmanToDelete] = useState<Salesman>({
        id: "",
        name: "",
        phone: "",
        company: {
            id: "",
            bankAccountNumber: "",
            bankName: "",
            name: "",
            bankBranch: "",
            address: "",
            taxableFirmName: "",
            taxableFirmAddress: "",
            taxIdentificationNumber: "",
            phone: ""
        },
        address: "",
        nationalIdentificationNumber: ""
    })

    const pageOfSalesman: Page<Salesman> = useSelector<RootState, Page<Salesman>>(state => state.salesman.pageOfSalesman)

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
        salesmanApiService.getSalesmen({
            page: 0,
            size: rowsPerPage,
            sort: sort
        }).then(response => {
            dispatch(setPageOfSalesman(response.data.data))
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
        salesmanApiService.getSalesmen({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfSalesman(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        salesmanApiService.getSalesmen({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfSalesman(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        salesmanApiService.getSalesmen({
            page: currentPage,
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfSalesman(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Table data to render
    const dataToRender = () => {
        return pageOfSalesman.content.map((item, index) => ({
            no: index + 1 + pageOfSalesman.pageable.offset,
            ...item,
        }))
    }

    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    const deleteSalesman = () => {
        salesmanApiService.deleteSalesman(salesmanToDelete.id)
            .then(response => {
                notifySuccess(salesmanToDelete.name + " Berhasil dihapus")
                initialLoadData()
            })
            .catch(error => {
                notifyError("Gagal hapus " + salesmanToDelete.name)
            })
    }


    return (
        <Fragment>

            <ModalDeleteConfirm
                isOpen={isDeleteModalVisible}
                toggleModal={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                toggleHeader={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                onClickDelete={() => {
                    deleteSalesman()
                }}
                onClickCancel={() => {

                }}
                data={salesmanToDelete.name}
            />

            <ModalAddSalesman
                isOpen={isModalAddBrandVisible}
                modalToggle={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                headerToggle={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                onClick={() => setIsModalAddBrandVisible(!isModalAddBrandVisible)}
                onClose={() => {
                    setIsModalAddBrandVisible(false)
                    initialLoadData()
                }}
            />

            <ModalUpdateSalesman
                salesman={salesmanToUpdate}
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
                        setSalesmanToUpdate(row)

                        setSalesmanToDelete(row)

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
                                setSalesmanToUpdate(row)
                            }}
                            useDelete
                            hasAuthorityToDelete
                            onClickDelete={() => {
                                showDeleteModal(row.name)
                                setSalesmanToDelete(row)
                            }}
                        />
                    }]}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfSalesman, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <SalesmanTableHeader
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
                            showDeleteModal(salesmanToDelete.name)
                        }}>
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </Item>
                </Menu>

            </Card>
        </Fragment>
    )
}

export default SalesmenList