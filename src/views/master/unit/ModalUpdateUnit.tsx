import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Form,
    FormFeedback
} from 'reactstrap'
import classnames from "classnames";
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {unitApiService} from "../../../apiservice/unit";
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import {Unit} from "../../../models/Unit";

interface ModalAddUnitProps {
    unit: Unit
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}


const ModalUpdateUnit = ({unit, modalToggle, headerToggle, onClick, onClose, isOpen}: ModalAddUnitProps) => {
    console.log(unit)

    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi")
    })

    const {register, errors, handleSubmit} = useForm({
        mode: 'onChange',
        resolver: yupResolver(SignupSchema),
    })

    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(onSubmitUpdate)(event)
    }

    const onSubmitUpdate = (data) => {
        console.log(data)

        unitApiService.updateUnit(unit.id, {
            name: data.name
        })
            .then(response => {
                notifySuccess("Satuan berhasil diedit")
                console.log(response)

                setTimeout(() => {
                    onClose()
                }, 300)

            })
            .catch(error => {
                console.log('create unit', error?.response?.data)
                notifyError(error?.response?.data?.message)
            })

    }


    return (
        <Modal
            className={classnames("d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <Form onSubmit={event => onSubmit(event)}>
                <ModalHeader toggle={headerToggle}>Edit Satuan</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            defaultValue={unit.name}
                            autoFocus
                            name='name'
                            id='name'
                            placeholder=''
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['name']})}
                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' className='mr-1' color='primary'>Simpan</Button>
                    <Button type='reset' color='secondary' outline onClick={() => {
                        onClose()
                    }}>
                        Batal
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalUpdateUnit