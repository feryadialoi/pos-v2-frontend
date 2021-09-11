import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {Dispatch, FC, ReactNode, SetStateAction, useState} from "react";

interface ModalDeleteConfirmationProps {
    isOpen: boolean
    toggleModal: () => void
    toggleHeader: () => void
    onClickDelete: () => void
    onClickCancel: () => void
    data: string
}

const ModalDeleteConfirmation = (
    {isOpen, toggleModal, toggleHeader, onClickDelete, onClickCancel, data}: ModalDeleteConfirmationProps) => {

    const handleCancel = () => {
        onClickCancel()
        toggleModal()
    }

    const handleDelete = () => {
        onClickDelete()
        toggleModal()
    }


    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
            toggle={toggleModal}
        >
            <ModalHeader onClick={toggleHeader}>Hapus Data</ModalHeader>

            <ModalBody>
                <Row>
                    <Col>
                        <div>
                            Anda yakin hapus data <span className="font-weight-bold">{data}</span>
                        </div>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleDelete}>Hapus</Button>
                <Button outline onClick={handleCancel}>Batal</Button>
            </ModalFooter>
        </Modal>
    )
}

type  UseModalDeleteConfirmation = [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    string,
    Dispatch<SetStateAction<string>>,
    (message: string) => void,
    FC<ModalDeleteConfirmationProps>
]

export const useModalDeleteConfirmation = (): UseModalDeleteConfirmation => {

    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState("")

    const showDelete = (message: string) => {
        setIsVisible(true)
        setData(message)
    }

    return [isVisible, setIsVisible, data, setData, showDelete, ModalDeleteConfirmation]

}