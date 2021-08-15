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
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import {brandApiService} from "../../../apiservice/brand";
import {Brand} from "../../../models/Brand";

interface ModalAddCategoryProps {
    brand: Brand
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}


const ModalUpdateBrand = (
    {
        brand,
        modalToggle,
        headerToggle,
        onClick,
        onClose,
        isOpen
    }: ModalAddCategoryProps) => {

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

        brandApiService.updateBrand(brand.id, {
            name: data.name
        })
            .then(response => {
                notifySuccess("Merk berhasil diedit")
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
                <ModalHeader toggle={headerToggle}>Edit Merk</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            defaultValue={brand.name}
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

export default ModalUpdateBrand