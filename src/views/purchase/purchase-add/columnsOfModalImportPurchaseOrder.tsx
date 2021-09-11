import {IDataTableColumn} from "react-data-table-component";
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import {formatDateToReadableDate} from "../../../utility/date-format-util";

const columnsOfModalImportPurchaseOrder: IDataTableColumn<PurchaseOrder & { no: any }>[] = [
    {
        name: "#",
        selector: "no",
        maxWidth: "80px",
        cell: row => row.no
    },
    {
        name: "Status",
        selector: "status",
        cell: row => row.status
    },
    {
        name: "Kode",
        selector: "code",
        cell: row => row.code
    },
    {
        name: "Tanggal",
        selector: "entryDate",
        cell: row => formatDateToReadableDate(new Date(row.entryDate))
    },
    {
        name: "Total",
        selector: "total",
        cell: row => row.total
    },
    {
        name: "Grand Total",
        selector: "grandTotal",
        cell: row => row.grandTotal
    }
]

export default columnsOfModalImportPurchaseOrder