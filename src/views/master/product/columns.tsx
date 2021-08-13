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
import {Button} from "reactstrap";
import {Product} from "../../../models/Product";
import {IDataTableColumn} from "react-data-table-component";

const renderAction = (row, actions?: DataTableColumnActions) => {
    return (
        <div className="d-flex">
            <Button onClick={() => {
                if (actions?.onClickView) {
                    actions?.onClickView(row)
                }

                alert(row.id)
            }} color='flat-primary' size="sm">
                <span className='text-truncate text-capitalize align-middle'>
                    <Eye size={18} className="text-primary mr-50"/>Lihat
                </span>
            </Button>
            <Button onClick={() => {
                alert("lihat")
            }} color='flat-warning bg-darken-2' size="sm">
                <span className='text-truncate text-capitalize align-middle'>
                    <Edit2 size={18} className="text-warning bf-darken-2 mr-50"/>Edit
                </span>
            </Button>
            <Button onClick={() => {
                alert("lihat")
            }} color='flat-danger' size="sm">
                <span className='text-truncate text-capitalize align-middle'>
                    <Delete size={18} className="text-danger mr-50"/>Hapus
                </span>
            </Button>
        </div>
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
        name: 'Nama Kategori',
        minWidth: '320px',
        selector: 'category',
        sortable: true,
        cell: row => row.category.name
    },
    {
        name: "Satuan Default",
        minWidth: '320px',
        selector: '',
        sortable: true,
        cell: row => {
            if (row.defaultUnit === "LARGE") return row.unitLarge.name
            if (row.defaultUnit === "MEDIUM") return row.unitMedium.name
            if (row.defaultUnit === "SMALL") return row.unitSmall.name
        }
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row, actions)
    },
]