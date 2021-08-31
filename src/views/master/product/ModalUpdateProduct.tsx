// @ts-ignore
import {selectThemeColors} from '@utils'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import TabAddProduct from "./TabAddProduct";
import classnames from "classnames";
import ProductGeneralInformation from "./ProductGeneralInformation";
import {Product} from "../../../models/Product";

interface ModalAddProductProps {
    product: Product
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
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
const ModalUpdateProduct = ({product, isOpen, modalToggle, headerToggle, onClick, onClose}: ModalAddProductProps) => {


    return (
        <Modal
            autoFocus={false}
            className={classnames("modal-lg min-h-75 d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <ModalHeader toggle={headerToggle}>Edit Produk</ModalHeader>

            <ModalBody>
                <p>{product.name}</p>
                <p>{product.code}</p>
                <p>{product.category.name}</p>
                <p>{product.brand.name}</p>
            </ModalBody>

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

export default ModalUpdateProduct