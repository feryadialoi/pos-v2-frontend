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
// @ts-ignore
import {selectThemeColors} from '@utils'
import classnames from "classnames";
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import {Salesman} from "../../../models/Salesman";
import {salesmanApiService} from "../../../apiservice/salesman";

interface ModalAddCategoryProps {
    salesman: Salesman
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}


const ModalUpdateSalesman = (
    {
        salesman,
        modalToggle,
        headerToggle,
        onClick,
        onClose,
        isOpen
    }: ModalAddCategoryProps) => {

    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi"),
        nationalIdentificationNumber: yup.string().required("NIK belum diisi"),
        address: yup.string().required("Alamat belum diisi"),
        phone: yup.string().required("Nomor telepon belum diisi"),
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

        salesmanApiService.updateSalesman(salesman.id, {
            name: data.name,
            nationalIdentificationNumber: data.nationalIdentificationNumber,
            address: data.address,
            phone: data.phone
        })
            .then(response => {
                notifySuccess("Sales berhasil diedit")
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
            autoFocus={false}
            className={classnames("d-flex d-inline-block", {"modal-dialog-centered": true})}
            // scrollable
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <Form onSubmit={event => onSubmit(event)}>
                <ModalHeader toggle={headerToggle}>Edit Customer</ModalHeader>
                <ModalBody>

                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            innerRef={register()}
                            id='name'
                            name='name'

                            defaultValue={salesman.name}
                            autoFocus={true}
                            placeholder=''
                            className={classnames({'is-invalid': errors['name']})}
                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for='nationalIdentificationNumber'>NIK</Label>
                        <Input
                            innerRef={register()}
                            id='nationalIdentificationNumber'
                            name='nationalIdentificationNumber'

                            defaultValue={salesman.nationalIdentificationNumber}
                            placeholder=''
                            className={classnames({'is-invalid': errors['nationalIdentificationNumber']})}
                        />
                        {errors && errors['nationalIdentificationNumber'] &&
                        <FormFeedback>{errors['nationalIdentificationNumber'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Alamat <span className='text-danger'>*</span></Label>
                        <Input
                            innerRef={register()}
                            id="address"
                            name="address"

                            type="textarea"
                            rows={3}
                            defaultValue={salesman.address}
                            className={classnames({'is-invalid': errors['address']})}
                        />
                        {errors && errors['address'] && <FormFeedback>{errors['address'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Nomor Telepon <span className='text-danger'>*</span></Label>
                        <Input
                            innerRef={register()}
                            defaultValue={salesman.phone}
                            name="phone"
                            id="phone"
                            className={classnames({'is-invalid': errors['phone']})}
                        />
                        {errors && errors['phone'] && <FormFeedback>{errors['phone'].message}</FormFeedback>}
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

export default ModalUpdateSalesman