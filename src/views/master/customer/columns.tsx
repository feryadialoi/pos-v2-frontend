import {
    MoreVertical,
    FileText,
    Trash2,
    Archive,
} from 'react-feather'
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {IDataTableColumn} from "react-data-table-component";
import {Link} from "react-router-dom";
import {Customer} from "../../../models/Customer";


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


export const columns: IDataTableColumn<Customer & { no: any }>[] = [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: 'Nama',
        minWidth: '200px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },
    {
        name: 'NIK',
        minWidth: '200px',
        selector: 'nationalIdentificationNumber',
        sortable: true,
        cell: row => row.nationalIdentificationNumber
    },
    {
        name: 'Alamat',
        minWidth: '200px',
        selector: 'address',
        sortable: true,
        cell: row => row.address
    },
    {
        name: 'Nomor Telepon',
        minWidth: '200px',
        selector: 'phone',
        sortable: true,
        cell: row => row.phone
    },
    {
        name: 'Nomor Telepon 2',
        minWidth: '200px',
        selector: 'phone2',
        sortable: true,
        cell: row => row.phone2
    },
    {
        name: 'Keterangan',
        minWidth: '200px',
        selector: 'description',
        sortable: true,
        cell: row => row.description
    },
    // {
    //     name: 'Aksi',
    //     allowOverflow: true,
    //     cell: row => renderAction(row)
    // },
]