// @ts-ignore
import {selectThemeColors} from '@utils'
// @ts-ignore
import Avatar from '@components/avatar'
// ** React Imports
import {Fragment, useState, useEffect, useRef} from 'react'


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
import {useHotkeys} from "react-hotkeys-hook";
import {RootState} from "../../../redux/states/root";
import {notifySuccess} from "../../component/SuccessToast";
import {Item, Menu, useContextMenu} from "react-contexify";
import 'react-contexify/dist/ReactContexify.min.css'
import '@styles/react/libs/context-menu/context-menu.scss'
import TablePagination from "../../component/TablePagination";
import ChartOfAccountTableHeader from "./ChartOfAccountTableHeader";
import {purchaseApiService} from "../../../apiservice/purchase";
import {setPageOfPurchase} from "../../../redux/actions/purchase";
import {ChartOfAccount} from "../../../models/ChartOfAccount";
import {chartOfAccountApiService} from "../../../apiservice/chart-of-account";
import {setPageOfChartOfAccount} from "../../../redux/actions/chart-of-account";
import ModalAddChartOfAccount from "./ModalAddChartOfAccount";


const ChartOfAccountsList = () => {
    const searchTermInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
    // ** Store Vars
    const dispatch = useDispatch()

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sort, setSort] = useState<string | null>("createdDate,asc")
    const [isModalAddChartOfAccountVisible, setIsModalAddChartOfAccountVisible] = useState(false)
    const pageOfCoa: Page<ChartOfAccount> = useSelector<RootState, Page<ChartOfAccount>>(state => state.chartOfAccount.pageOfChartOfAccount)

    useHotkeys("ctrl+shift+s", () => {
        searchTermInputRef?.current?.focus()
    });

    useHotkeys("ctrl+b", () => {
        console.log("ctrl+b")
    })

    const getChartOfAccounts = (params: { [key: string]: any }) => {
        chartOfAccountApiService.getChartOfAccounts({
            page: params.page,
            size: params.size,
            sort: params.sort,
        })
            .then((response) => {
                dispatch(setPageOfChartOfAccount(response.data.data))
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    // ** initially load data
    const initialLoadData = () => {
        getChartOfAccounts({
            page: 0,
            size: rowsPerPage,
            sort: sort,
        })
    }

    // ** Get data on mount
    useEffect(() => {
        initialLoadData()
    }, [])


    // ** Function in get data on page change
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)

        getChartOfAccounts({
            page: page.selected,
            size: rowsPerPage,
            sort: sort
        })
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
        getChartOfAccounts({
            page: currentPage,
            size: value,
            sort: sort
        })
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        getChartOfAccounts({
            page: currentPage,
            size: rowsPerPage,
            sort: sort
        })
    }


    // ** Table data to render
    const dataToRender = () => {
        return pageOfCoa.content.map((item, index) => ({
            no: index + 1 + pageOfCoa.pageable.offset,
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
            <ModalAddChartOfAccount
                isOpen={isModalAddChartOfAccountVisible}
                modalToggle={() => setIsModalAddChartOfAccountVisible(!isModalAddChartOfAccountVisible)}
                headerToggle={() => setIsModalAddChartOfAccountVisible(!isModalAddChartOfAccountVisible)}
                onClick={() => {
                    setIsModalAddChartOfAccountVisible(!isModalAddChartOfAccountVisible)
                }}
                onClose={() => {
                    setIsModalAddChartOfAccountVisible(!isModalAddChartOfAccountVisible)
                }}
            />
            <Card>
                <DataTable
                    onRowClicked={(row, event) => {

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
                    onSort={(row) => {
                        console.log('sort', row)
                    }}
                    className='react-dataTable'
                    paginationComponent={() => TablePagination(pageOfCoa, currentPage, handlePagination)}
                    data={dataToRender()}
                    subHeaderComponent={
                        <ChartOfAccountTableHeader
                            innerRef={searchTermInputRef}
                            toggleModal={() => {
                                setIsModalAddChartOfAccountVisible(!isModalAddChartOfAccountVisible)
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

export default ChartOfAccountsList