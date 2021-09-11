import {FC, Fragment, useEffect, useRef, useState} from "react";
import {
    Button,
    Card,
    Col,
    CustomInput,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {columns} from "./columns";
import {Archive, ChevronDown, Delete, FileText, Trash2} from "react-feather";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../../../models/Page";
import {RootState} from "../../../redux/states/root";
import {Warehouse} from "../../../models/Warehouse";
import {warehouseApiService} from "../../../apiservice/warehouse";
import {setPageOfWarehouse} from "../../../redux/actions/warehouse";
import {useHotkeys} from "react-hotkeys-hook";
import ModalAddWarehouse from "./ModalAddWarehouse";
import {Item, Menu, useContextMenu} from "react-contexify";
import {notifySuccess} from "../../component/SuccessToast";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import ModalUpdateWarehouse from "./ModalUpdateWarehouse";
import WarehouseTableHeader from "./WarehouseTableHeader";
import TablePagination from "../../component/TablePagination";
import TableActionButton from "../../component/table-action-button";
import {notifyError} from "../../component/ErrorToast";
import set from "react-hook-form/dist/utils/set";
import {useModalDeleteConfirmation} from "../../component/ModalDeleteConfirmation";

const WarehousesList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    const dispatch = useDispatch()

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [warehouseToUpdate, setWarehouseToUpdate] = useState<Warehouse>({
        id: '', name: '', address: '',
    })

    const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse>({
        id: '', name: '', address: '',
    })


    const [isModalAddWarehouseVisible, setIsModalAddWarehouseVisible] = useState(false)
    const [isModalUpdateWarehouseVisible, setIsModalUpdateWarehouseVisible] = useState(false)

    const pageOfWarehouse: Page<Warehouse> = useSelector<RootState, Page<Warehouse>>(state => state.warehouse.pageOfWarehouse)

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });
    useHotkeys("ctrl+b", () => {

    })
    useHotkeys("esc", () => {

    })


    const toggleModalAddWarehouse = () => setIsModalAddWarehouseVisible(!isModalAddWarehouseVisible)


    const initialLoadData = () => {
        warehouseApiService.getWarehouses({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            address: searchTerm,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setPageOfWarehouse(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    useEffect(() => {
        initialLoadData()
    }, [])

    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
        warehouseApiService.getWarehouses({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            address: searchTerm,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setPageOfWarehouse(response.data.data))
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
            address: searchTerm,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setPageOfWarehouse(response.data.data))
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
            address: val,
            sort: sort
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(setPageOfWarehouse(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const dataToRender = () => {
        return pageOfWarehouse.content.map((item, index) => ({
            no: index + 1 + pageOfWarehouse.pageable.offset,
            ...item
        }))
    }

    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }

    const deleteWarehouse = () => {
        warehouseApiService.deleteWarehouse(warehouseToDelete.id)
            .then(response => {
                notifySuccess("Berhasil dihapus")
                initialLoadData()
            })
            .catch(error => {
                notifyError("Gagal hapus, " + error?.response?.error)
            })
    }

    const [isDeleteModalVisible, setIsDeleteModalVisible, message, setMessage, showDeleteDialog, DeleteModalConfirm] = useModalDeleteConfirmation()

    return (
        <Fragment>
            <DeleteModalConfirm
                isOpen={isDeleteModalVisible}
                toggleModal={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                toggleHeader={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                onClickDelete={() => {
                    deleteWarehouse()
                }}
                onClickCancel={() => {
                }}
                data={warehouseToDelete.name}
            />
            <ModalUpdateWarehouse
                warehouse={warehouseToUpdate}
                isOpen={isModalUpdateWarehouseVisible}
                modalToggle={() => setIsModalUpdateWarehouseVisible(!isModalUpdateWarehouseVisible)}
                headerToggle={() => setIsModalUpdateWarehouseVisible(!isModalUpdateWarehouseVisible)}
                onClick={() => setIsModalUpdateWarehouseVisible(!isModalUpdateWarehouseVisible)}
                onClose={() => {
                    setIsModalUpdateWarehouseVisible(false)
                }}
                onSuccess={() => {
                    setIsModalUpdateWarehouseVisible(false)
                    initialLoadData()
                }}
            />
            <ModalAddWarehouse
                isOpen={isModalAddWarehouseVisible}
                modalToggle={() => setIsModalAddWarehouseVisible(!isModalAddWarehouseVisible)}
                headerToggle={() => setIsModalAddWarehouseVisible(!isModalAddWarehouseVisible)}
                onClick={() => setIsModalAddWarehouseVisible(!isModalAddWarehouseVisible)}
                onClose={() => {
                    setIsModalAddWarehouseVisible(false)
                }}
                onSuccess={() => {
                    setIsModalAddWarehouseVisible(false)
                    initialLoadData()
                }}
            />
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        const warehouse: Warehouse = {
                            id: row.id,
                            name: row.name,
                            address: row.address
                        }
                        setWarehouseToUpdate(warehouse)
                        setWarehouseToDelete(warehouse)
                        show(event)
                    }}
                    highlightOnHover
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={[...columns, {
                        name: "Aksi",
                        cell: row => (<TableActionButton
                            hasAuthorityToEdit
                            hasAuthorityToDelete
                            useDelete
                            useEdit
                            onClickDelete={() => {
                                setWarehouseToDelete(row)
                                showDeleteDialog(warehouseToDelete.name)
                            }}
                            onClickEdit={() => {
                                setIsModalUpdateWarehouseVisible(true)
                                setWarehouseToUpdate(row)
                            }}
                        />)
                    }]}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfWarehouse, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <WarehouseTableHeader
                            innerRef={searchTermInputRef}
                            toggleModal={toggleModalAddWarehouse}
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
                            setIsModalUpdateWarehouseVisible(true)
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

export default WarehousesList
