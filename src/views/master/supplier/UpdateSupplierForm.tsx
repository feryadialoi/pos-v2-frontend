import {Fragment} from "react";
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    ModalBody,
    ModalFooter,
    Row
} from "reactstrap";
import {useForm} from "react-hook-form";
import classnames from "classnames";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {supplierApiService} from "../../../apiservice/supplier";
import {notifySuccess} from "../../component/SuccessToast";
import {Supplier} from "../../../models/Supplier";

interface AddSupplierFormProps {
    supplier: Supplier
    onSuccess: () => void
}

const AddSupplierForm = ({supplier, onSuccess}: AddSupplierFormProps) => {
    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi"),
        address: yup.string().required("Alamat belum diisi"),
        pic: yup.string().required("PIC belum diisi"),
        phone: yup.string().required("Nomor Telepon belum diisi"),
        email: yup.string().required("Email belum diisi"),
        bankName: yup.string().required("Nama Bank belum diisi"),
        bankBranch: yup.string().required("Cabang Bank belum diisi"),
        bankAccountNumber: yup.string().required("Nomor Rekening belum diisi"),
        taxIdentificationNumber: yup.string().required("NPWP belum diisi"),
        taxableFirmName: yup.string().required("Nama PKP diisi"),
        taxableFirmAddress: yup.string().required("Alamat PKP diisi"),
    })

    const {register, errors, handleSubmit} = useForm({mode: 'onChange', resolver: yupResolver(SignupSchema)})

    const onSubmit = (data) => {
        console.log(data)

        supplierApiService.updateSupplier(supplier.id, {
            name: data.name,
            address: data.address,

            pic: data.pic,
            phone: data.phone,
            email: data.email,

            bankName: data.bankName,
            bankBranch: data.bankBranch,
            bankAccountNumber: data.bankAccountNumber,

            taxIdentificationNumber: data.taxIdentificationNumber,
            taxableFirmName: data.taxableFirmName,
            taxableFirmAddress: data.taxableFirmAddress,
        })
            .then(response => {
                notifySuccess("Supplier berhasil disimpan")

                console.log(response)

                onSuccess()

            })
            .catch(error => console.log(error?.response?.data))

    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>


                    <FormGroup>
                        <Label for="code">Kode Supplier</Label>
                        <Input
                            id="code"
                            name="code"
                            disabled
                            defaultValue="auto"
                            placeholder="Kode Supplier"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Nama</Label>
                        <Input
                            autoFocus={true}
                            id="name"
                            name="name"
                            defaultValue={supplier.name}
                            placeholder="Nama"
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['name']})}
                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Alamat</Label>
                        <Input
                            id="address"
                            name="address"
                            defaultValue={supplier.address}
                            type="textarea"
                            rows={3}
                            placeholder="Alamat"
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['address']})}
                        />
                        {errors && errors['address'] && <FormFeedback>{errors['address'].message}</FormFeedback>}
                    </FormGroup>

                    <hr/>

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="pic">PIC</Label>
                                <Input
                                    id="pic"
                                    name="pic"
                                    defaultValue={supplier.pic}
                                    placeholder="PIC"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['pic']})}
                                />
                                {errors && errors['pic'] && <FormFeedback>{errors['pic'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="phone">Nomor Telepon</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    defaultValue={supplier.phone}
                                    placeholder="081234567890"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['phone']})}
                                />
                                {errors && errors['phone'] && <FormFeedback>{errors['phone'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    defaultValue={supplier.email}
                                    placeholder="Email"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['email']})}
                                />
                                {errors && errors['email'] && <FormFeedback>{errors['email'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="bankName">Nama Bank</Label>
                                <Input
                                    id="bankName"
                                    name="bankName"
                                    defaultValue={supplier.bankName}
                                    placeholder="Nama Bank"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['bankName']})}
                                />
                                {errors && errors['bankName'] &&
                                <FormFeedback>{errors['bankName'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="bankBranch">Cabang Bank</Label>
                                <Input
                                    id="bankBranch"
                                    name="bankBranch"
                                    defaultValue={supplier.bankBranch}
                                    placeholder="Cabang Bank"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['bankBranch']})}
                                />
                                {errors && errors['bankBranch'] &&
                                <FormFeedback>{errors['bankBranch'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="bankAccountNumber">Nomor Rekening</Label>
                                <Input
                                    id="bankAccountNumber"
                                    name="bankAccountNumber"
                                    defaultValue={supplier.bankAccountNumber}
                                    placeholder="Nomor Rekening"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['bankAccountNumber']})}
                                />
                                {errors && errors['bankAccountNumber'] &&
                                <FormFeedback>{errors['bankAccountNumber'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="taxIdentificationNumber">NPWP</Label>
                                <Input
                                    id="taxIdentificationNumber"
                                    name="taxIdentificationNumber"
                                    defaultValue={supplier.taxIdentificationNumber}
                                    placeholder="NPWP"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['taxIdentificationNumber']})}
                                />
                                {errors && errors['taxIdentificationNumber'] &&
                                <FormFeedback>{errors['taxIdentificationNumber'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="taxableFirmName">Nama PKP</Label>
                                <Input
                                    id="taxableFirmName"
                                    name="taxableFirmName"
                                    defaultValue={supplier.taxableFirmName}
                                    placeholder="Nama PKP"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['taxableFirmName']})}
                                />
                                {errors && errors['taxableFirmName'] &&
                                <FormFeedback>{errors['taxableFirmName'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="taxableFirmAddress">Alamat PKP</Label>
                                <Input
                                    id="taxableFirmAddress"
                                    name="taxableFirmAddress"
                                    defaultValue={supplier.taxableFirmAddress}
                                    placeholder="Alamat PKP"
                                    innerRef={register({required: true})}
                                    className={classnames({'is-invalid': errors['taxableFirmAddress']})}
                                />
                                {errors && errors['taxableFirmName'] &&
                                <FormFeedback>{errors['taxableFirmName'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <FormGroup className="d-flex justify-content-end">
                        <Button type="submit" color="primary" className="mr-1" onClick={() => {
                        }}>Simpan</Button>

                        <Button color="primary" outline onClick={() => {
                        }}>Reset</Button>
                    </FormGroup>
                </ModalFooter>
            </Form>
        </Fragment>
    )
}

export default AddSupplierForm;