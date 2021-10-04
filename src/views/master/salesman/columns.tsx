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
    {
        name: 'Nik',
        minWidth: '200px',
        selector: 'nationalIdentificationNumber',
        sortable: true,
        cell: row => row.nationalIdentificationNumber
    },
    {
        name: 'Nomor Telepon',
        minWidth: '200px',
        selector: 'phone',
        sortable: true,
        cell: row => row.phone
    },
    {
        name: 'Alamat',
        minWidth: '200px',
        selector: 'address',
        sortable: true,
        cell: row => row.address
    },
]