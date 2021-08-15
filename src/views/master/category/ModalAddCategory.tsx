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
import {categoryApiService} from "../../../apiservice/category";

interface ModalAddCategoryProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}


const ModalAddCategory = ({modalToggle, headerToggle, onClick, onClose, isOpen}: ModalAddCategoryProps) => {
    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi")
    })

    const {register, errors, handleSubmit} = useForm({mode: 'onChange', resolver: yupResolver(SignupSchema)})
    const onSubmit = (data) => {
        console.log(data)

        categoryApiService.createCategory({
            name: data.name
        })
            .then(response => {
                notifySuccess("Kategori berhasil disimpan")
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={headerToggle}>Tambah Satuan</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
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

export default ModalAddCategory