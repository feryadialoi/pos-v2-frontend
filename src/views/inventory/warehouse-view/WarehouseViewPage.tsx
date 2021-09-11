import {Fragment, useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {warehouseApiService} from "../../../apiservice/warehouse";
import {WarehouseWithProductStocks} from "../../../models/WarehouseWithProductStocks";
import {initialPage} from "../../../redux/reducers/constant";
import {ChevronDown} from "react-feather";
import TablePagination from "../../component/TablePagination";
import WarehouseTableHeader from "../warehouse/WarehouseTableHeader";
import DataTable from "react-data-table-component";
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {columns} from "./columns";
import ProductStockOfWarehouseTableHeader from "./ProductStockOfWarehouseTableHeader";


interface WarehouseViewPageParams {
    warehouseId: string
}


const WarehouseViewPage = () => {

    const history = useHistory()
    const location = useLocation()
    const params = useParams<WarehouseViewPageParams>()

    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")


    const [isLoading, setIsLoading] = useState(true)
    const [warehouseWithProductStocks, setWarehouseWithProductStocks] = useState<WarehouseWithProductStocks>({
        warehouse: {
            id: "",
            name: "",
            address: ""
        },
        pageOfProductStock: initialPage
    })

    const getWarehouseWithProductStocks = () => {
        const warehouseId = params.warehouseId
        warehouseApiService.getWarehouseWithProductStocks(warehouseId)
            .then(response => {
                setWarehouseWithProductStocks(response.data.data)
            })
            .catch(error => {
                console.error(error?.response)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }


    const dataToRender = () => {
        return warehouseWithProductStocks.pageOfProductStock.content.map((item, index) => {
            return ({
                no: index + 1,
                ...item
            })
        })
    }


    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        // getWarehouses({
        //     page: page.selected,
        //     size: rowsPerPage,
        //     sort: sort
        // })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        // getWarehouses({
        //     page: currentPage,
        //     size: value,
        //     sort: sort
        // })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        // getWarehouses({
        //     page: currentPage,
        //     size: rowsPerPage,
        //     sort: sort
        // })
    }


    const gotoProductStockViewPage = (productStockId: string) => {
        const warehouseId = warehouseWithProductStocks.warehouse.id
        history.push(`/inventories/warehouses/view/${warehouseId}/product-stocks/${productStockId}`)
    }


    useEffect(() => {
        getWarehouseWithProductStocks()
    }, [])


    if (isLoading) return <div>Loading...</div>
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {warehouseWithProductStocks.warehouse.name}
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <div>alamat</div>
                            <div>{warehouseWithProductStocks.warehouse.address}</div>
                        </Col>
                    </Row>
                </CardBody>

                <CardBody>
                    <Row>
                        <Col>
                            <div>Stok Produk</div>
                        </Col>
                    </Row>
                </CardBody>

                <DataTable
                    onRowClicked={(row, event) => {
                        gotoProductStockViewPage(row.id)
                        // const {no: _, ...rest} = row
                        // setSelectedWarehouse(rest)
                        // // show(event)
                        //
                        // gotoWarehouseViewPage(rest.id)
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
                    paginationComponent={() => TablePagination(warehouseWithProductStocks.pageOfProductStock, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <ProductStockOfWarehouseTableHeader
                            onClickAdd={() => {
                            }}
                            handlePerPage={handlePerPage}
                            rowsPerPage={rowsPerPage}
                            searchTerm={searchTerm}
                            handleFilter={handleFilter}
                        />
                    }
                />

            </Card>
        </Fragment>
    )
}

export default WarehouseViewPage