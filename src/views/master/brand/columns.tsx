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
import {Category} from "../../../models/Category";
import {IDataTableColumn} from "react-data-table-component";
import {Link} from "react-router-dom";


const renderAction = (row) => {
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



export const columns: IDataTableColumn<Category & { no: any }>[] = [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: 'Nama',
        minWidth: '320px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },
    // {
    //     name: 'Aksi',
    //     allowOverflow: true,
    //     cell: row => renderAction(row)
    // },
]