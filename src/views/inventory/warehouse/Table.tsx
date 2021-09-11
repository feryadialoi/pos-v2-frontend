import {Fragment, useEffect, useState} from "react";
import {Card} from "reactstrap";
import DataTable from "react-data-table-component"
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {Archive, ChevronDown, FileText, Trash2} from "react-feather";
import TablePagination from "../../component/TablePagination";
import {Page} from "../../../models/Page";
import {Warehouse} from "../../../models/Warehouse";
import {initialPage} from "../../../redux/reducers/constant";
import {warehouseApiService} from "../../../apiservice/warehouse";
import {Mapping} from "../../../models/Mapping";
import WarehouseTableHeader from "./WarehouseTableHeader";
import {columns} from "./columns";
import {useHistory} from "react-router-dom";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import {notifySuccess} from "../../component/SuccessToast";

const WarehousesList = () => {

    const history = useHistory()

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [isLoading, setIsLoading] = useState(true)
    const [pageOfWarehouse, setPageOfWarehouse] = useState<Page<Warehouse>>(initialPage)
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)

    const getWarehouses = (params: Mapping) => {
        warehouseApiService.getWarehouses({})
            .then(response => {
                setPageOfWarehouse(response.data.data)
            })
            .catch(error => {
                console.error(error?.response)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        getWarehouses({
            page: page.selected,
            size: rowsPerPage,
            sort: sort
        })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        getWarehouses({
            page: currentPage,
            size: value,
            sort: sort
        })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        getWarehouses({
            page: currentPage,
            size: rowsPerPage,
            sort: sort
        })
    }

    // ** initially load data
    const initialLoadData = () => {
        getWarehouses({
            page: 0,
            size: rowsPerPage,
            sort: sort
        })
    }


    useEffect(() => {
        initialLoadData()
    }, [])


    const dataToRender = () => {
        return pageOfWarehouse.content.map((item, index) => ({no: index + 1, ...item}))
    }

    const gotoWarehouseViewPage = (warehouseId: string) => {
        history.push("/inventories/warehouses/view/" + warehouseId)
    }


    const {show} = useContextMenu({
        id: 'menu_id'
    })

    const handleClick = text => {
        notifySuccess(text)
    }


// =====================================================================================================================

    // ** view render section
    if (isLoading) return <div>Loading...</div>
    return (
        <Fragment>
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {
                        const {no: _, ...rest} = row
                        setSelectedWarehouse(rest)
                        // show(event)

                        gotoWarehouseViewPage(rest.id)
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
                    paginationComponent={() => TablePagination(pageOfWarehouse, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <WarehouseTableHeader
                            onClickAdd={() => {
                            }}
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
                            // gotoWarehouseViewPage()
                        }}>
                        <FileText size={14} className='mr-50'/>
                        <span className='align-middle'>Detail</span></Item>
                    <Item
                        onClick={() => {

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