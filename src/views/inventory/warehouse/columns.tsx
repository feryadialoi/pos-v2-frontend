import {IDataTableColumn} from "react-data-table-component";
import {Warehouse} from "../../../models/Warehouse";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Archive, FileText, MoreVertical, Trash2} from "react-feather";
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


export const columns: IDataTableColumn<Warehouse & { no: any }>[] = [
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
    {
        name: 'Alamat',
        minWidth: '320px',
        selector: 'address',
        sortable: true,
        cell: row => row.address
    },
    {
        name: 'Nilai',
        minWidth: '320px',
        selector: 'name',
        sortable: true,
        cell: row => 500000
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row)
    },
]