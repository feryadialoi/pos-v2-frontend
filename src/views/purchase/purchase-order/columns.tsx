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
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import {formatValue} from "react-currency-input-field";
import {PurchaseOrderStatus} from "../../../models/PurchaseOrderStatus";

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
    const color = (status: PurchaseOrderStatus) => {
        switch (status) {
            case "DRAFT":
                return "light-dark"
            case "AWAITING_APPROVAL":
                return "light-info"
            case "APPROVED":
                return "light-success"
            case "COMPLETE":
                return "light-success"
            case "REFUSED":
                return "danger"
            case "VOID":
                return "danger"
            default:
                return "dark"
        }
    }

    return (
        <Badge pill color={color(row.status)} className='mr-1'>
            {row.status}
        </Badge>
    )
}


export const columns: IDataTableColumn<PurchaseOrder & { no: any }>[] = [
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
        name: 'Tanggal Transaksi',
        minWidth: '320px',
        selector: 'entryDate',
        sortable: true,
        cell: row => row.entryDate
    },
    {
        name: 'Tanggal Jatuh Tempo',
        minWidth: '320px',
        selector: 'dueDate',
        sortable: true,
        cell: row => row.dueDate || "-"
    },
    {
        name: 'Diskon',
        minWidth: '320px',
        selector: 'discount',
        sortable: true,
        cell: row => formatValue({
            value: row.discount.toString(),
            decimalSeparator: ",",
            groupSeparator: ".",
            prefix: "Rp "
        })
    },
    {
        name: 'Pajak',
        minWidth: '320px',
        selector: 'tax',
        sortable: true,
        cell: row => formatValue({
            value: row.tax.toString(),
            decimalSeparator: ",",
            groupSeparator: ".",
            prefix: "Rp "
        })
    },
    {
        name: 'Grand Total',
        minWidth: '320px',
        selector: 'grandTotal',
        sortable: true,
        cell: row => formatValue({
            value: row.grandTotal.toString(),
            decimalSeparator: ",",
            groupSeparator: ".",
            prefix: "Rp "
        })
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row)
    },
]