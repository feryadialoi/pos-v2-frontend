import {IDataTableColumn} from "react-data-table-component";
import {Product} from "../../../models/Product";

const columnsOfProduct: IDataTableColumn<Product & { no: any }>[] = [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: 'Kode/SKU',
        maxWidth: '160px',
        selector: 'code',
        sortable: true,
        cell: row => row.code
    },
    {
        name: 'Nama',
        minWidth: '320px',
        selector: 'name',
        sortable: true,
        cell: row => row.name
    }
]

export default columnsOfProduct