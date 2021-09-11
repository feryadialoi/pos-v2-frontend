import {IDataTableColumn} from "react-data-table-component";
import {PurchaseOrderDetail} from "../../../models/PurchaseOrderDetail";

const columns: IDataTableColumn<PurchaseOrderDetail & { no: any }>[] = [
    {
        name: '#',
        maxWidth: '100px',
        selector: 'no',
        sortable: true,
        cell: row => row.no
    },
    {
        name: "Nama Produk",
        maxWidth: "320px",
        minWidth: "200px",
        selector: "product.name",
        cell: row => row.product.name
    },
    {
        name: "Quantity",
        maxWidth: "320px",
        selector: "quantity",
        cell: row => row.quantity
    },
    {
        name: "Unit",
        maxWidth: "320px",
        selector: "unit",
        cell: row => row.unit.name
    },
    {
        name: "Diskon",
        maxWidth: "320px",
        selector: "discount",
        cell: row => row.discount
    },
    {
        name: "Pajak",
        maxWidth: "320px",
        selector: "tax",
        cell: row => row.tax
    },
    {
        name: "Harga",
        maxWidth: "320px",
        selector: "price",
        cell: row => row.price
    },
    {
        name: "Jumlah",
        maxWidth: "320px",
        selector: "amount",
        cell: row => row.total
    },
]

export default columns