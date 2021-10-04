import {Modal, ModalBody, ModalHeader} from "reactstrap";
import classnames from "classnames";
import AddSupplierForm from "./AddSupplierForm";

interface ModalAddSupplierProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onSuccess: () => void
}

const ModalAddSupplier = ({isOpen, modalToggle, headerToggle, onClick, onSuccess}: ModalAddSupplierProps) => {
    return (
        <Modal
            autoFocus={false}
            className={classnames("modal-lg min-h-75 d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <ModalHeader toggle={headerToggle}>Tambah Supplier</ModalHeader>

            <AddSupplierForm onSuccess={onSuccess} toggleModal={modalToggle}/>

            {/*<ModalFooter>*/}
            {/*    <Button color='primary' onClick={onClick}>*/}
            {/*        Accept*/}
            {/*    </Button>*/}
            {/*</ModalFooter>*/}
        </Modal>
    )
}


export default ModalAddSupplier