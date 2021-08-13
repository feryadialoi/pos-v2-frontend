import {Modal, ModalBody, ModalHeader} from "reactstrap";
import classnames from "classnames";
import AddSupplierForm from "./AddSupplierForm";

interface ModalAddSupplierProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
}

const ModalAddSupplier = ({isOpen, modalToggle, headerToggle, onClick}: ModalAddSupplierProps) => {
    return (
        <Modal
            className={classnames("modal-lg min-h-75 d-flex d-inline-block", {"modal-dialog-centered": false})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <ModalHeader toggle={headerToggle}>Tambah Supplier</ModalHeader>
            <ModalBody>

                <AddSupplierForm/>

            </ModalBody>
            {/*<ModalFooter>*/}
            {/*    <Button color='primary' onClick={onClick}>*/}
            {/*        Accept*/}
            {/*    </Button>*/}
            {/*</ModalFooter>*/}
        </Modal>
    )
}


export default ModalAddSupplier