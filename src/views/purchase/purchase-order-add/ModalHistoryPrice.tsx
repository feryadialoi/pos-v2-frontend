import {Modal, ModalBody, ModalHeader} from "reactstrap";
import {useState} from "react";
import DataTable, {IDataTableColumn} from "react-data-table-component";
import '@styles/react/libs/tables/react-dataTable-component.scss'


const columns: IDataTableColumn<any & { no: any }>[] = [
    // {
    //     name: '#',
    //     maxWidth: '100px',
    //     selector: 'no',
    //     sortable: true,
    //     cell: row => row.no
    // },
    {
        name: 'Invoice',
        // minWidth: '320px',
        selector: 'invoice',
        sortable: true,
        cell: row => row.invoice
    },
    {
        name: 'Tanggal',
        // minWidth: '320px',
        selector: 'entryDate',
        sortable: true,
        cell: row => row.entryDate
    },
    {
        name: 'Harga',
        // minWidth: '320px',
        selector: 'price',
        sortable: true,
        cell: row => row.price
    },
]

export interface HistoryPriceParam {
    productId: string
    supplierId: string
    unitId: string
}

export interface HistoryPrice {

}

interface ModalHistoryPriceProps {
    isOpen: boolean
    toggleModal: () => void
    toggleHeader: () => void
    historyPriceParam: any
    onClickHistoryPrice: (historyPrice: any) => void
}

const ModalHistoryPrice = (props: ModalHistoryPriceProps) => {
    const {isOpen, toggleModal, toggleHeader, historyPriceParam, onClickHistoryPrice} = props

    const [historyPrices, setHistoryPrices] = useState([
        {
            invoice: "P-2020-08-00001",
            entryDate: "20-20-20",
            price: "50.000"
        }
    ])

    const dataToRender = () => {
        return historyPrices.map((item, index) => ({
            no: index + 1, ...item
        }))
    }

    return (
        <Modal
            autoFocus={false}
            className="modal-dialog-centered"
            scrollable
            isOpen={isOpen}
            toggle={toggleModal}
        >
            <ModalHeader toggle={toggleHeader}>History Harga Produk</ModalHeader>
            <ModalBody>
                <DataTable
                    noHeader
                    columns={columns}
                    data={dataToRender()}
                />
                {historyPrices.length == 0 && <p>Tidak ada history harga</p>}
            </ModalBody>
        </Modal>
    )
}

export default ModalHistoryPrice