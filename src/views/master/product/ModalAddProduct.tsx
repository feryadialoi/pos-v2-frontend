// @ts-ignore
import {selectThemeColors} from '@utils'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import TabAddProduct from "./TabAddProduct";
import classnames from "classnames";

interface ModalAddProductProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
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
const ModalAddProduct = ({isOpen, modalToggle, headerToggle, onClick}: ModalAddProductProps) => {


    return (
        <Modal
            className={classnames("modal-lg min-h-75 d-flex d-inline-block", {"modal-dialog-centered": false})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <ModalHeader toggle={headerToggle}>Modal Title</ModalHeader>
            <ModalBody>
                <TabAddProduct/>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={onClick}>
                    Accept
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalAddProduct