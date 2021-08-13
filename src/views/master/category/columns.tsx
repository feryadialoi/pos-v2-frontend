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
import {Category} from "../../../models/Category";
import {IDataTableColumn} from "react-data-table-component";

const renderAction = (row) => {
    return (
        <div className="d-flex">
            <Button color='flat-primary' size="sm">
                <span className='text-truncate text-capitalize align-middle'>
                    <Eye size={18} className="text-primary mr-50"/>Lihat
                </span>
            </Button>
            <Button color='flat-warning bg-darken-2' size="sm">
                <span className='text-truncate text-capitalize align-middle'>
                    <Edit2 size={18} className="text-warning bf-darken-2 mr-50"/>Edit
                </span>
            </Button>
            <Button color='flat-danger' size="sm">
                <span className='text-truncate text-capitalize align-middle'>
                    <Delete size={18} className="text-danger mr-50"/>Hapus
                </span>
            </Button>
        </div>
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
        selector: 'email',
        sortable: true,
        cell: row => row.name
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row)
    },
]