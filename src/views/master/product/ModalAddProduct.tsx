// @ts-ignore
import {selectThemeColors} from '@utils'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import TabAddProduct from "./TabAddProduct";
import classnames from "classnames";
import ProductGeneralInformation from "./ProductGeneralInformation";

interface ModalAddProductProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
    onSuccess: () => void
}

/**
 * informasi umum
 * - nama
 * - kode/sku
 * = category (categoryId)
 *
 * penjualan
 * - termasuk ppn
 *
 * pembelian
 * -
 *
 * persediaan
 * - stok
 *
 * akuntansi
 * - piutang
 * - hutang
 *
 *
 */
const ModalAddProduct = ({isOpen, modalToggle, headerToggle, onClick, onClose, onSuccess}: ModalAddProductProps) => {


    return (
        <Modal
            autoFocus={false}
            className={classnames("modal-lg min-h-75 d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <ModalHeader toggle={headerToggle}>Tambah Produk</ModalHeader>

            <ProductGeneralInformation onSuccess={onSuccess}/>
            {/*<ModalFooter>*/}
            {/*    <Button color='primary' onClick={() => {*/}
            {/*        onClose()*/}
            {/*    }}>*/}
            {/*        Accept*/}
            {/*    </Button>*/}
            {/*</ModalFooter>*/}
        </Modal>
    )
}

export default ModalAddProduct