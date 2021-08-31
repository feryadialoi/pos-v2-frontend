import {IDataTableColumn} from "react-data-table-component";
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import {PurchaseOrderDetail} from "../../../models/PurchaseOrderDetail";
import TableActionButton from "../../component/table-action-button";

const columnsOfModalImportPurchaseOrder: IDataTableColumn<PurchaseOrderDetail & { no: any }>[] = [
    {
        name: "#",
        selector: "no",
        maxWidth: "80px",
        cell: row => row.no
    },
    {
        name: "Nama Produk",
        selector: "product.name",
        cell: row => row.product.name
    },
    {
        name: "Unit",
        selector: "unit",
        cell: row => row.unit.name
    },
    {
        name: "Quantity",
        selector: "product.name",
        cell: row => row.quantity
    },
    {
        name: "Diskon",
        selector: "discount",
        cell: row => row.discount
    },
    {
        name: "Pajak",
        selector: "tax",
        cell: row => row.tax
    },
    {
        name: "Jumlah",
        selector: "amount",
        cell: row => row.amount
    },
    {
        name: "Aksi",
        cell: row => (
            <TableActionButton
                // useDetail={true}
                useEdit={true}
                useDelete={true}
                hasAuthorityToViewDetail={true}
                hasAuthorityToEdit={true}
                hasAuthorityToDelete={true}
                onClickDetail={() => {

                }}
                onClickEdit={() => {

                }}
                onClickDelete={() => {

                }}
            />
        )
    }
]

export default columnsOfModalImportPurchaseOrder