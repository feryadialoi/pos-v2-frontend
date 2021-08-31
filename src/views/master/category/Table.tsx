import {Button, Card, Col, CustomInput, Input, Label, Row} from "reactstrap";
import {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Page} from "../../../models/Page";
import {RootState} from "../../../redux/states/root";
import {useHotkeys} from "react-hotkeys-hook";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {Archive, ChevronDown, FileText, Trash2} from "react-feather";
import {columns} from "./columns";
import {categoryApiService} from "../../../apiservice/category";
import {setPageOfCategory} from "../../../redux/actions/category";
import {Category} from "../../../models/Category";
import {notifySuccess} from "../../component/SuccessToast";
import ModalAddCategory from "./ModalAddCategory";
import ModalUpdateCategory from "./ModalUpdateCategory";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import TablePagination from "../../component/TablePagination";
import CategoryTableHeader from "./CategoryTableHeader";

const CategoriesList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isModalAddCategoryVisible, setIsModalAddCategoryVisible] = useState(false)
    const [isModalUpdateCategoryVisible, setIsModalUpdateCategoryVisible] = useState(false)
    const [categoryToUpdate, setCategoryToUpdate] = useState<Category>({id: "", name: ""})

    const [timer, setTimer] = useState<any>(null)

    const pageOfCategory: Page<Category> = useSelector<RootState, Page<Category>>(state => state.category.pageOfCategory)

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
    const toggleModalAddCategory = () => setIsModalAddCategoryVisible(!isModalAddCategoryVisible)


    const initialLoadData = () => {
        categoryApiService.getCategories({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {

                dispatch(setPageOfCategory(response.data.data))

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

        categoryApiService.getCategories({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {

                dispatch(setPageOfCategory(response.data.data))

            })
            .catch((error) => {
                console.log(error?.response?.data)
            })

    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {

        const value = parseInt(e.currentTarget.value)

        setRowsPerPage(value)

        categoryApiService.getCategories({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {

                dispatch(setPageOfCategory(response.data.data))

            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)

        categoryApiService
            .getCategories({
                page: currentPage,
                size: rowsPerPage,
                name: val,
                sort: sort
            })
            .then((response) => {
                dispatch(setPageOfCategory(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Table data to render
    const dataToRender = () => {
        return pageOfCategory.content.map((item, index) => ({
            no: index + 1 + pageOfCategory.pageable.offset,
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
            <ModalAddCategory
                isOpen={isModalAddCategoryVisible}
                modalToggle={() => setIsModalAddCategoryVisible(!isModalAddCategoryVisible)}
                headerToggle={() => setIsModalAddCategoryVisible(!isModalAddCategoryVisible)}
                onClick={() => setIsModalAddCategoryVisible(!isModalAddCategoryVisible)}
                onClose={() => {
                    setIsModalAddCategoryVisible(false)
                    initialLoadData()
                }}
            />
            <ModalUpdateCategory
                category={categoryToUpdate}
                isOpen={isModalUpdateCategoryVisible}
                modalToggle={() => setIsModalUpdateCategoryVisible(!isModalUpdateCategoryVisible)}
                headerToggle={() => setIsModalUpdateCategoryVisible(!isModalUpdateCategoryVisible)}
                onClick={() => setIsModalUpdateCategoryVisible(!isModalUpdateCategoryVisible)}
                onClose={() => {
                    setIsModalUpdateCategoryVisible(false)
                    initialLoadData()
                }}/>
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        setCategoryToUpdate({
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
                    paginationComponent={() => TablePagination(pageOfCategory, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <CategoryTableHeader
                            innerRef={searchTermInputRef}
                            toggleModal={toggleModalAddCategory}
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
                            setIsModalUpdateCategoryVisible(true)
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

export default CategoriesList