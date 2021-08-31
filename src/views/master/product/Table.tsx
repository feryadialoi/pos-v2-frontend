// ** React Imports
import {Fragment, useState, useEffect, useRef} from 'react'
// ** Columns
import {columns} from './columns'
// ** Store & Actions
import {useDispatch, useSelector} from 'react-redux'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import {Archive, ChevronDown, FileText, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
// @ts-ignore
import {selectThemeColors} from '@utils'
import {Card, Input, Row, Col, Label, CustomInput, Button, Spinner} from 'reactstrap'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Page} from "../../../models/Page";
import {useHotkeys} from "react-hotkeys-hook";
import {RootState} from "../../../redux/states/root";
import {setPageOfProduct} from "../../../redux/actions/product";
import {productApiService} from "../../../apiservice/product";
import {Product} from "../../../models/Product";
import ModalAddProduct from "./ModalAddProduct";
import {Item, Menu, useContextMenu} from "react-contexify";
import {notifySuccess} from "../../component/SuccessToast";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import ModalUpdateProduct from "./ModalUpdateProduct";
import TablePagination from "../../component/TablePagination";
import ProductTableHeader from "./ProductTableHeader";


const ProductsList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [timer, setTimer] = useState<any>(null)
    const [isLoadingTable, setIsLoadingTable] = useState(true)
    const [isModalAddProductVisible, setIsModalAddProductVisible] = useState(false)
    const [isModalUpdateProductVisible, setIsModalUpdateProductVisible] = useState(false)
    const [productToUpdate, setProductToUpdate] = useState<Product>({
        id: '',
        name: '',
        category: {id: '', name: ''},
        brand: {id: '', name: ''},
        code: '',
        unitConversions: [],
        units: []
    })


    const pageOfProduct: Page<Product> = useSelector<RootState, Page<Product>>(state => state.product.products)

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });
    useHotkeys("ctrl+b", () => {
        setIsModalAddProductVisible(true)
    })
    useHotkeys("esc", () => {
        setIsModalAddProductVisible(false)
    })

    // ** Get data on mount
    useEffect(() => {
        initialLoadData()

        console.log("mount")


    }, [])

    // ** Function in get data
    const initialLoadData = () => {
        productApiService.getProducts({
            page: 0,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfProduct(response.data.data))
                setIsLoadingTable(false)
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        productApiService.getProducts({
            page: page.selected,
            size: rowsPerPage,
            name: searchTerm,
            sort: sort
        })
            .then((response) => {
                dispatch(setPageOfProduct(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {

        const value = parseInt(e.currentTarget.value)

        console.log(value)

        setRowsPerPage(value)

        productApiService.getProducts({
            page: currentPage,
            size: value,
            name: searchTerm,
            sort: sort
        })
            .then(response => {
                dispatch(setPageOfProduct(response.data.data))
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        console.log(val)
        setSearchTerm(val)

        productApiService.getProducts({
            page: currentPage,
            size: rowsPerPage,
            name: val,
            sort: sort
        })
            .then((response) => {

                dispatch(setPageOfProduct(response.data.data))

            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** Table data to render
    const dataToRender = () => {
        return pageOfProduct.content.map((item, index) => ({
            no: index + 1 + pageOfProduct.pageable.offset,
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
            <ModalAddProduct
                isOpen={isModalAddProductVisible}
                modalToggle={() => setIsModalAddProductVisible(!isModalAddProductVisible)}
                headerToggle={() => setIsModalAddProductVisible(!isModalAddProductVisible)}
                onClick={() => setIsModalAddProductVisible(!isModalAddProductVisible)}
                onClose={() => {
                    setIsModalAddProductVisible(false)
                    initialLoadData()
                }}
                onSuccess={() => {
                    setIsModalAddProductVisible(false)
                    initialLoadData()
                }}
            />
            <ModalUpdateProduct
                product={productToUpdate}
                isOpen={isModalUpdateProductVisible}
                modalToggle={() => setIsModalUpdateProductVisible(!isModalUpdateProductVisible)}
                headerToggle={() => setIsModalUpdateProductVisible(!isModalUpdateProductVisible)}
                onClick={() => setIsModalUpdateProductVisible(!isModalUpdateProductVisible)}
                onClose={() => {
                    setIsModalUpdateProductVisible(false)
                    initialLoadData()
                }}
            />
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        setProductToUpdate(row)
                        show(event)
                    }}
                    noHeader
                    pagination
                    subHeader
                    responsive
                    paginationServer
                    columns={columns({
                        onClickView: (data) => {
                            alert("hello from parent " + data?.name)
                        },
                        onClickEdit: () => {
                        },
                        onClickDelete: () => {
                        }
                    })}
                    progressPending={isLoadingTable}
                    highlightOnHover
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfProduct, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <ProductTableHeader
                            innerRef={searchTermInputRef}
                            toggleModal={() => {
                                setIsModalAddProductVisible(true)
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
                            setIsModalUpdateProductVisible(true)
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

export default ProductsList
