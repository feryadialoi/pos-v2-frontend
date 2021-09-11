// @ts-ignore
import {selectThemeColors} from '@utils'
// @ts-ignore
import Avatar from '@components/avatar'
// ** React Imports
import {Fragment, useState, useEffect, useRef} from 'react'

// ** Invoice List Sidebar
import SidebarAddUnit from './SidebarAddUnit'

// ** Columns
import {columns} from './columns'

// ** Store & Actions
import {useDispatch, useSelector} from 'react-redux'

// ** Third Party Components
import {Archive, Check, ChevronDown, FileText, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
import {Card} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Page} from "../../../models/Page";
import {unitApiService} from "../../../apiservice/unit";
import {useHotkeys} from "react-hotkeys-hook";
import {setPageOfUnit} from "../../../redux/actions/unit";
import {RootState} from "../../../redux/states/root";
import {Unit} from "../../../models/Unit";
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import ModalAddUnit from "./ModalAddUnit";
import ModalUpdateUnit from "./ModalUpdateUnit";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import TablePagination from "../../component/TablePagination";
import UnitTableHeader from "./UnitTableHeader";
import {useModalDeleteConfirmation} from "../../component/ModalDeleteConfirmation";
import TableActionButton from "../../component/table-action-button";


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
    const [unitToDelete, setUnitToDelete] = useState<Unit>({id: "", name: ""})

    const pageOfUnit: Page<Unit> = useSelector<RootState, Page<Unit>>(state => state.unit.pageOfUnit)

    const [isDeleteModalVisible, setIsDeleteModalVisible, message, setMessage, showDeleteDialog, ModalDeleteConfirm] = useModalDeleteConfirmation()

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });

    useHotkeys("ctrl+b", () => {
        console.log("ctrl+b")
        setIsModalAddUnitVisible(true)
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
                dispatch(setPageOfUnit(response.data.data))
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
                dispatch(setPageOfUnit(response.data.data))
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
                dispatch(setPageOfUnit(response.data.data))
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
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfUnit(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
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

    const deleteUnit = () => {
        unitApiService.deleteUnit(unitToDelete.id)
            .then(response => {
                notifySuccess("Berhasil dihapus")

                initialLoadData()

            })
            .catch(error => {
                notifyError(error?.response?.error)
            })
    }

    return (
        <Fragment>
            <ModalDeleteConfirm
                isOpen={isDeleteModalVisible}
                toggleModal={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                toggleHeader={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                onClickDelete={() => {
                    deleteUnit()
                }}
                onClickCancel={() => {

                }}
                data={unitToDelete.name}
            />
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
                        setUnitToUpdate(row)
                        setUnitToDelete(row)
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
                        cell: (row) => <TableActionButton
                            hasAuthorityToEdit
                            useEdit
                            hasAuthorityToDelete
                            useDelete
                            onClickEdit={() => {
                                setIsModalUpdateUnitVisible(true)
                                setUnitToUpdate(row)
                            }}
                            onClickDelete={() => {
                                setIsDeleteModalVisible(true)
                                setUnitToDelete(row)
                            }}
                        />
                    }]}
                    sortIcon={<ChevronDown/>}
                    onSort={(row) => {
                        console.log('sort', row)
                    }}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfUnit, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <UnitTableHeader
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
                    <Item
                        onClick={() => {
                        }}>
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Details</span></Item>
                    <Item
                        onClick={() => {
                            setIsModalUpdateUnitVisible(true)
                        }}>
                        <Archive size={14} className='mr-50'/>
                        <span className='align-middle'>Edit</span>
                    </Item>
                    <Item
                        onClick={() => {
                            showDeleteDialog(unitToDelete.name)
                        }}>
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </Item>
                </Menu>

            </Card>
        </Fragment>
    )
}

export default UnitsList