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
import {IDataTableColumn} from "react-data-table-component";
import {Link} from "react-router-dom";
import {Employee} from "../../../models/Employee";


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


export const columns: IDataTableColumn<Employee & { no: any }>[] = [
    {
        name: '#',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        minWidth: "200px",
        name: 'Nama',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    },
    {
        minWidth: "200px",
        name: 'NIK',
        selector: 'nationalIdentificationNumber',
        sortable: true,
        cell: row => row.nationalIdentificationNumber
    },
    {
        minWidth: "200px",
        name: 'Tempat Lahir',
        selector: 'placeOfBirth',
        sortable: true,
        cell: row => row.placeOfBirth
    },
    {
        minWidth: "200px",
        name: 'Tanggal Lahir',
        selector: 'dateOfBirth',
        sortable: true,
        cell: row => row.dateOfBirth
    },
    {
        minWidth: "200px",
        name: 'Alamat',
        selector: 'address',
        sortable: true,
        cell: row => row.address
    },
    {
        minWidth: "200px",
        name: 'Alamat KTP',
        selector: 'addressInIdentityCard',
        sortable: true,
        cell: row => row.addressInIdentityCard
    },
    {
        minWidth: "200px",
        name: 'Agama',
        selector: 'religion',
        sortable: true,
        cell: row => row.religion
    },
    {
        minWidth: "200px",
        name: 'Pendidikan Terakhir',
        selector: 'education',
        sortable: true,
        cell: row => row.education
    },
    {
        minWidth: "200px",
        name: 'Tanggal Masuk Kerja',
        selector: 'joinDate',
        sortable: true,
        cell: row => row.joinDate
    },
    {
        minWidth: "200px",
        name: 'Nomor Telepon',
        selector: 'phone',
        sortable: true,
        cell: row => row.phone
    },
    {
        minWidth: "200px",
        name: 'Nomor Telepon 2',
        selector: 'phone2',
        sortable: true,
        cell: row => row.phone2
    },
    {
        minWidth: "200px",
        name: 'Email',
        selector: 'email',
        sortable: true,
        cell: row => row.email
    },
    {
        minWidth: "200px",
        name: 'Email Perusahaan',
        selector: 'officeEmail',
        sortable: true,
        cell: row => row.officeEmail
    },
    {
        minWidth: "200px",
        name: 'Status Pernikahan',
        selector: 'marriage',
        sortable: true,
        cell: row => row.marriage
    },
    {
        minWidth: "200px",
        name: 'Jenis Kelamin',
        selector: 'gender',
        sortable: true,
        cell: row => row.gender
    },
    {
        minWidth: "200px",
        name: 'NPWP',
        selector: 'taxIdentificationNumber',
        sortable: true,
        cell: row => row.taxIdentificationNumber
    },
    {
        minWidth: "200px",
        name: 'BPJS',
        selector: 'insuranceAndSocialSecurity',
        sortable: true,
        cell: row => row.insuranceAndSocialSecurity
    },
    {
        minWidth: "200px",
        name: 'Nama Bank',
        selector: 'bankName',
        sortable: true,
        cell: row => row.bankName
    },
    {
        minWidth: "200px",
        name: 'Cabang Bank',
        selector: 'bankBranch',
        sortable: true,
        cell: row => row.bankBranch
    },
    {
        minWidth: "200px",
        name: 'Nomor Rekening Bank',
        selector: 'bankAccountNumber',
        sortable: true,
        cell: row => row.bankAccountNumber
    },
    {
        minWidth: "200px",
        name: 'Status Karyawan',
        selector: 'status',
        sortable: true,
        cell: row => row.status
    },
    {
        name: 'Aktif',
        selector: 'active',
        sortable: true,
        cell: row => row.active
    },


    // {
    //     name: 'Aksi',
    //     allowOverflow: true,
    //     cell: row => renderAction(row)
    // },
]