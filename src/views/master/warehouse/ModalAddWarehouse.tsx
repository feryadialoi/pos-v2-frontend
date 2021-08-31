import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "reactstrap";
import classnames from "classnames";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {unitApiService} from "../../../apiservice/unit";
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import {warehouseApiService} from "../../../apiservice/warehouse";


interface ModalAddWarehouseProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
    onSuccess: () => void
}

const ModalAddWarehouse = (
    {
        isOpen,
        modalToggle,
        headerToggle,
        onClick,
        onClose,
        onSuccess
    }: ModalAddWarehouseProps) => {
    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi"),
        address: yup.string().required("Alamat belum diisi"),

    })

    const {register, errors, handleSubmit} = useForm({mode: 'onChange', resolver: yupResolver(SignupSchema)})
    const onSubmit = (data) => {
        console.log(data)

        warehouseApiService.createWarehouse({
            name: data.name,
            address: data.address
        })
            .then(response => {
                notifySuccess("Gudang berhasil disimpan")
                console.log(response)

                setTimeout(() => {
                    onSuccess()
                }, 300)

            })
            .catch(error => {
                console.log('create unit', error?.response?.data)
                notifyError(error?.response?.data?.message)
            })

    }


    return (
        <Modal
            autoFocus={false}
            className={classnames("d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={headerToggle}>Tambah Gudang</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            autoFocus={true}
                            name='name'
                            id='name'
                            placeholder='nama gudang'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['name']})}

                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for='address'>Alamat <span className='text-danger'>*</span></Label>
                        <Input
                            name='address'
                            id='address'
                            placeholder='alamat'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['name']})}

                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' color="primary" className="mr-1">Simpan</Button>
                    <Button type='reset' color="primary" outline onClick={() => onClose()}>Batal</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default ModalAddWarehouse