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
import {Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Unit} from "../../../models/Unit";
import {IDataTableColumn} from "react-data-table-component";
import {store} from "../../../redux/storeConfig/store";
import {Link} from "react-router-dom";
import {Purchase} from "../../../models/Purchase";
import {PurchaseOrderStatus} from "../../../models/PurchaseOrderStatus";
import {PurchaseStatus} from "../../../models/PurchaseStatus";

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

const StatusBadge = (row) => {
    const color = (status: PurchaseStatus) => {
        switch (status) {
            case "UNPAID":
                return "dark"
            case "PARTIAL_PAID":
                return "light-info"
            case "PAID":
                return "light-success"
            case "VOID":
                return "danger"
            default:
                return "light-success"
        }
    }

    return (
        <Badge pill color={color(row.status)} className='mr-1'>
            {row.status}
        </Badge>
    )
}

export const columns: IDataTableColumn<Purchase & { no: any }>[] = [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: 'Status',
        minWidth: '320px',
        selector: 'status',
        sortable: true,
        cell: row => StatusBadge(row)
    },
    {
        name: 'Kode',
        minWidth: '320px',
        selector: 'code',
        sortable: true,
        cell: row => row.code
    },
    {
        name: 'Supplier',
        minWidth: '320px',
        selector: 'supplier',
        sortable: true,
        cell: row => row.supplier.name
    },
    {
        name: 'Ref',
        minWidth: '320px',
        selector: 'reference',
        sortable: true,
        cell: row => row.reference || "-"
    },
    {
        name: 'Tipe Pembayaran',
        minWidth: '320px',
        selector: 'paymentType',
        sortable: true,
        cell: row => row.paymentType
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row)
    },
]