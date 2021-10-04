import {Card} from "reactstrap";
import {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../../../models/Page";
import {RootState} from "../../../redux/states/root";
import {useHotkeys} from "react-hotkeys-hook";
import DataTable from "react-data-table-component";
import {Archive, ChevronDown, FileText, Trash2} from "react-feather";
import {columns} from "./columns";
import {Category} from "../../../models/Category";
import {notifySuccess} from "../../component/SuccessToast";
import {Brand} from "../../../models/Brand";
import {brandApiService} from "../../../apiservice/brand";
import {setPageOfBrand} from "../../../redux/actions/brand";
import ModalAddBrand from "./ModalAddBrand";
import ModalUpdateBrand from "./ModalUpdateBrand";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import TablePagination from "../../component/TablePagination";
import BrandTableHeader from "./BrandTableHeader";
import '@styles/react/libs/tables/react-dataTable-component.scss'
import TableActionButton from "../../component/table-action-button";
import {useModalDeleteConfirmation} from "../../component/ModalDeleteConfirmation";
import {notifyError} from "../../component/ErrorToast";

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
    const [brandToDelete, setBrandToDelete] = useState<Brand>({id: "", name: ""})

    const [timer, setTimer] = useState<any>(null)

    const pageOfBrand: Page<Category> = useSelector<RootState, Page<Brand>>(state => state.brand.pageOfBrand)


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

        brandApiService
            .getBrands({
                page: 0,
                size: rowsPerPage,
                name: searchTerm,
                sort: sort
            })
            .then((response) => {
                dispatch(setPageOfBrand(response.data.data))
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
                dispatch(setPageOfBrand(response.data.data))
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
                dispatch(setPageOfBrand(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {

        setSearchTerm(val)

        brandApiService.getBrands({
            page: currentPage,
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfBrand(response.data.data))

            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
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

    const deleteBrand = () => {
        brandApiService.deleteBrand(brandToDelete.id)
            .then(response => {
                notifySuccess(brandToDelete.name + " Berhasil dihapus")
            })
            .catch(error => {
                notifyError("Gagal hapus " + brandToDelete.name)
            })
    }


    return (
        <Fragment>

            <ModalDeleteConfirm
                isOpen={isDeleteModalVisible}
                toggleModal={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                toggleHeader={() => setIsDeleteModalVisible(!isDeleteModalVisible)}
                onClickDelete={() => {
                    deleteBrand()
                }}
                onClickCancel={() => {

                }}
                data={brandToDelete.name}
            />

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
                        setBrandToUpdate(row)

                        setBrandToDelete(row)

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
                            hasAuthorityToEdit={false}
                            useEdit
                            onClickEdit={() => {
                                setIsModalUpdateBrandVisible(true)
                                setBrandToUpdate(row)
                            }}

                            useDelete
                            hasAuthorityToDelete={false}
                            onClickDelete={() => {
                                showDeleteModal(row.name)
                                setBrandToDelete(row)
                            }}
                        />
                    }]}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfBrand, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <BrandTableHeader
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
                            showDeleteModal(brandToDelete.name)
                        }}>
                        <Trash2 size={14} className='mr-50'/>
                        <span className='align-middle'>Delete</span>
                    </Item>
                </Menu>

            </Card>
        </Fragment>
    )
}

export default BrandsList