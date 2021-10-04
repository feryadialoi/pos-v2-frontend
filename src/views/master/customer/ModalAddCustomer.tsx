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
    FormFeedback, CustomInput
} from 'reactstrap'
// @ts-ignore
import {selectThemeColors} from '@utils'
import classnames from "classnames";
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import {customerApiService} from "../../../apiservice/customer";
import Select from "react-select";

interface ModalAddCustomerProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}


const ModalAddCustomer = ({modalToggle, headerToggle, onClick, onClose, isOpen}: ModalAddCustomerProps) => {
    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi"),
        nationalIdentificationNumber: yup.string().required("NIK belum diisi"),
        address: yup.string().required("Alamat belum diisi"),
        phone: yup.string().required("Nomor telepon belum diisi"),
    })

    const {register, errors, handleSubmit} = useForm({mode: 'onChange', resolver: yupResolver(SignupSchema)})

    const onSubmit = (data) => {
        console.log(data)

        customerApiService.createCustomer({
            name: data.name,
            nationalIdentificationNumber: data.nationalIdentificationNumber,
            address: data.address,
            phone: data.phone,
            phone2: data.phone2,
            description: data.description
        })
            .then(response => {
                notifySuccess("Customer berhasil disimpan")
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={headerToggle}>Tambah Customer</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            autoFocus={true}
                            name='name'
                            id='name'
                            placeholder=''
                            innerRef={register()}
                            className={classnames({'is-invalid': errors['name']})}
                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="nationalIdentificationNumber">NIK <span className='text-danger'>*</span></Label>
                        <Input
                            name="nationalIdentificationNumber"
                            innerRef={register()}
                            id="nationalIdentificationNumber"
                            className={classnames({'is-invalid': errors['nationalIdentificationNumber']})}
                        />
                        {errors && errors['nationalIdentificationNumber'] &&
                        <FormFeedback>{errors['nationalIdentificationNumber'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="address">Alamat <span className='text-danger'>*</span></Label>
                        <Input
                            innerRef={register()}
                            type="textarea"
                            rows={3}
                            name="address"
                            id="address"
                            className={classnames({'is-invalid': errors['address']})}
                        />
                        {errors && errors['address'] && <FormFeedback>{errors['address'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone">Nomor Telepon <span className='text-danger'>*</span></Label>
                        <Input
                            innerRef={register()}
                            name="phone"
                            id="phone"
                            className={classnames({'is-invalid': errors['phone']})}
                        />
                        {errors && errors['phone'] && <FormFeedback>{errors['phone'].message}</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="phone2">Nomor Telepon 2</Label>
                        <Input
                            innerRef={register()}
                            name="phone2"
                            id="phone2"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="description">Keterangan</Label>
                        <Input
                            innerRef={register()}
                            name="description"
                            id="description"
                        />
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

export default ModalAddCustomer