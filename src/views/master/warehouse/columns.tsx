import {IDataTableColumn} from "react-data-table-component";
import {Warehouse} from "../../../models/Warehouse";

const renderAction = (row) => {
    return (
        <div>

        </div>
    )
}

export const columns: IDataTableColumn<Warehouse & { no: any }>[] = [
    {
        name: "#",
        minWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: "Nama",
        minWidth: "320px",
        selector: "email",
        sortable: true,
        cell: row => row.name
    },
    {
        name: "Address",
        minWidth: "320px",
        selector: "email",
        sortable: true,
        cell: row => row.address
    },
    {
        name: 'Aksi',
        allowOverflow: true,
        cell: row => renderAction(row)
    },
]