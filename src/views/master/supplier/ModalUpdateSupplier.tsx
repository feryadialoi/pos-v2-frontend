import {Modal, ModalBody, ModalHeader} from "reactstrap";
import classnames from "classnames";
import AddSupplierForm from "./AddSupplierForm";
import UpdateSupplierForm from "./UpdateSupplierForm";
import {Supplier} from "../../../models/Supplier";

interface ModalAddSupplierProps {
    supplier: Supplier
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onSuccess: () => void
}

const ModalAddSupplier = ({supplier, isOpen, modalToggle, headerToggle, onClick, onSuccess}: ModalAddSupplierProps) => {
    return (
        <Modal
            autoFocus={false}
            className={classnames("modal-lg min-h-75 d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <ModalHeader toggle={headerToggle}>Edit Supplier</ModalHeader>

            <UpdateSupplierForm supplier={supplier} onSuccess={onSuccess} modalToggle={modalToggle}/>

            {/*<ModalFooter>*/}
            {/*    <Button color='primary' onClick={onClick}>*/}
            {/*        Accept*/}
            {/*    </Button>*/}
            {/*</ModalFooter>*/}
        </Modal>
    )
}


export default ModalAddSupplier