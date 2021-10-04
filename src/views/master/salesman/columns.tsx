import {IDataTableColumn} from "react-data-table-component";
import {Salesman} from "../../../models/Salesman";

export const columns: IDataTableColumn<Salesman & { no: number }> [] = [
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
]