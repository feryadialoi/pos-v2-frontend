import {
    Slack,
    User,
    Settings,
    Database,
    Edit2,
    MoreVertical,
    FileText,
    Trash2,
    Archive,
    Eye,
    Delete
} from 'react-feather'
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Product} from "../../../models/Product";
import {IDataTableColumn} from "react-data-table-component";
import {Link} from "react-router-dom";


const renderAction = (row, actions?: DataTableColumnActions) => {
    return (
        <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
                <MoreVertical size={14} className='cursor-pointer'/>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem
                    tag={Link}
                    to={`/apps/user/view/${row.id}`}
                    className='w-100'
                    onClick={() => {
                    }}
                >
                    <FileText size={14} className='mr-50'/>
                    <span className='align-middle'>Details</span>
                </DropdownItem>
                <DropdownItem
                    tag={Link}
                    to={`/apps/user/edit/${row.id}`}
                    className='w-100'
                    onClick={() => {
                    }}
                >
                    <Archive size={14} className='mr-50'/>
                    <span className='align-middle'>Edit</span>
                </DropdownItem>
                <DropdownItem className='w-100'
                              onClick={() => {
                              }}
                >
                    <Trash2 size={14} className='mr-50'/>
                    <span className='align-middle'>Delete</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>

    )
}


interface DataTableColumnActions<V = any, E = any, D = any> {
    onClickView?: (data?: Product) => V
    onClickEdit?: (data?: Product) => E
    onClickDelete?: (data?: Product) => D
}

export const columns = <V, E, D>(actions?: DataTableColumnActions<V, E, D>): IDataTableColumn<Product & { no: any }>[] => [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: 'Kode/SKU',
        minWidth: '320px',
        selector: 'name',
        sortable: true,
        cell: row => row.code
    },
    {
        name: 'Nama',
        minWidth: '320px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },
    {
        name: 'Kategori',
        minWidth: '320px',
        selector: 'category',
        sortable: true,
        cell: row => row.category.name
    },
    {
        name: 'Merk',
        minWidth: '320px',
        selector: 'brand',
        sortable: true,
        cell: row => row.brand.name
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row, actions)
    },
]