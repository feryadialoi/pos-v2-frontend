import {
    Slack,
    User,
    Settings,
    MoreVertical,
    FileText,
    Trash2,
    Archive
} from 'react-feather'
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Unit} from "../../../models/Unit";
import {IDataTableColumn} from "react-data-table-component";
import {store} from "../../../redux/storeConfig/store";
import {Link} from "react-router-dom";
import {Purchase} from "../../../models/Purchase";
import {Sale} from "../../../models/Sale";

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


export const columns: IDataTableColumn<Sale & { no: any }>[] = [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row)
    },
]