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
    FormFeedback, CustomInput, Row, Col
} from 'reactstrap'
// @ts-ignore
import {selectThemeColors} from '@utils'
import classnames from "classnames";
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import Select from "react-select";
import {Indonesian} from "flatpickr/dist/l10n/id";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {useEffect, useState} from "react";
import {employeeApiService} from "../../../apiservice/employee";
import {CreateEmployeeRequest} from "../../../models/requests/CreateEmployeeRequest";
import {Gender} from "../../../models/Gender";
import {formatDateToCommonFormat} from "../../../utility/date-format-util";
import {Company} from "../../../models/Company";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/states/root";
import {Employee} from "../../../models/Employee";
import {UpdateEmployeeRequest} from "../../../models/requests/UpdateEmployeeRequest";


const monthOptions = [
    {label: "Januari", value: "1",},
    {label: "Februari", value: "2",},
    {label: "Maret", value: "3",},
    {label: "April", value: "4",},
    {label: "Mei", value: "5",},
    {label: "Juni", value: "6",},
    {label: "Juli", value: "7",},
    {label: "Agustus", value: "8",},
    {label: "September", value: "9",},
    {label: "Oktober", value: "10",},
    {label: "November", value: "11",},
    {label: "Desember", value: "12",},
]

const religionOptions = [
    {label: "Islam", value: "ISLAM"},
    {label: "Kristen", value: "CHRISTIAN"},
    {label: "Katolik", value: "CATHOLIC"},
    {label: "Hindu", value: "HINDU"},
    {label: "Budha", value: "BUDDHA"},
    {label: "Kong Hu Cu", value: "KONG_HU_CU"},
]

const employeeStatusOptions = [
    {label: "Karyawan Tetap", value: "PERMANENT"},
    {label: "Karyawan Kontrak", value: "CONTRACT"},
    {label: "Karyawan Magang", value: "INTERN"},
]

interface ModalUpdateEmployeeProps {
    employee: Employee
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}

const ModalUpdateEmployee = (
    {
        modalToggle,
        headerToggle,
        onClick,
        onClose,
        isOpen,
        employee
    }: ModalUpdateEmployeeProps) => {

    const SignupSchema = yup.object().shape({
        address: yup.string().required("Alamat saat ini belum diisi"),
        addressInIdentityCard: yup.string().required("Alamat KTP belum diisi"),
        bankAccountNumber: yup.string().required("Nomor rekening bank belum diisi"),
        bankName: yup.string().required("Bank belum diisi"),
        bankBranch: yup.string().required("Cabang bank belum diisi"),
        dateOfBirth: yup.array().required("Tanggal lahir belum diisi"),
        education: yup.string().required("Tanggal masuk kerja belum diisi"),
        email: yup.string().required("Email belum diisi"),
        officeEmail: yup.string().required("Email perusahaan belum diisi"),
        insuranceAndSocialSecurity: yup.string().required("BPJS belum diisi"),
        joinDate: yup.array().required("Tanggal masuk kerja belum diisi"),
        name: yup.string().required("Nama belum diisi"),
        nationalIdentificationNumber: yup.string().required("NIK belum diisi"),
        phone: yup.string().required("Nomor telepon belum diisi"),
        // phone2: yup.string().required("Nomor telpon2 belum diisi"),
        placeOfBirth: yup.string().required("Tempat lahir belum diisi"),
        religion: yup.object().required("Agama belum diisi").nullable(),
        status: yup.object().required("Status karyawan belum diisi").nullable(),
        taxIdentificationNumber: yup.string().required("NPWP belum diisi"),
    })

    console.log('employee to update', employee)

    const {register, errors, setError, handleSubmit, control} = useForm(
        {
            mode: 'onChange',
            resolver: yupResolver(SignupSchema)
        }
    )

    const [gender, setGender] = useState<{ gender: Gender | null | undefined; errorMessage: string | null }>({
        gender: employee.gender,
        errorMessage: null
    })

    const [marriage, setMarriage] = useState<boolean>(employee.marriage)

    const company = useSelector<RootState, Company>(state => state.company.company)

    useEffect(() => {
        setGender({
            gender: employee.gender,
            errorMessage: null
        })

        setMarriage(employee.marriage)

    }, [employee])

    const onSubmit = (data) => {

        console.log({...data, gender, marriage: marriage})

        if (!gender.gender) {
            return;
        }

        console.log(company)

        const updateEmployeeRequest: UpdateEmployeeRequest = {
            active: data.active,
            address: data.address,
            addressInIdentityCard: data.addressInIdentityCard,
            bankAccountNumber: data.bankAccountNumber,
            bankName: data.bankName,
            dateOfBirth: formatDateToCommonFormat((data.dateOfBirth as Date[])[0]),
            education: data.education,
            email: data.email,
            officeEmail: data.officeEmail,
            gender: gender.gender!,
            insuranceAndSocialSecurity: data.insuranceAndSocialSecurity,
            joinDate: formatDateToCommonFormat((data.joinDate as Date[])[0]),
            marriage: marriage,
            name: data.name,
            nationalIdentificationNumber: data.nationalIdentificationNumber,
            phone: data.phone,
            phone2: data.phone2,
            placeOfBirth: data.placeOfBirth,
            religion: data.religion.value,
            status: data.status.value,
            taxIdentificationNumber: data.taxIdentificationNumber,

            companyId: company.id,
            userId: employee.user.id,
        }


        employeeApiService.updateEmployee(
            employee.id,
            updateEmployeeRequest
        )
            .then(response => {
                notifySuccess("Karyawan berhasil disimpan")
                console.log(response)

                setTimeout(() => {
                    onClose()
                }, 300)

            })
            .catch(error => {
                console.log('create employee', error?.response)
                notifyError(error?.response?.message)
                applyErrorFromServer(error?.response?.error)
            })

    }

    const applyErrorFromServer = (errors) => {
        for (const error in errors) {
            setError(error, {message: errors[error]})
        }
    }

    const handleClickOfSubmit = () => {
        setGender(prevState => {
            const newState = {
                gender: prevState.gender,
                errorMessage: prevState.gender ? null : "Jenis kelamin belum dipilih"
            }
            console.log(newState)
            return newState
        })
    }

    return (
        <Modal
            autoFocus={false}
            className={classnames("d-flex d-inline-block", {"modal-dialog-centered": true})}
            isOpen={isOpen}
            toggle={modalToggle}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={headerToggle}>Edit Karyawan</ModalHeader>
                <ModalBody>

                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            defaultValue={employee.name}
                            autoFocus={true}
                            name='name'
                            id='name'
                            placeholder=''
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['name']})}
                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for='nationalIdentificationNumber'>NIK <span className='text-danger'>*</span></Label>
                        <Input
                            defaultValue={employee.nationalIdentificationNumber}
                            name='nationalIdentificationNumber'
                            id='nationalIdentificationNumber'
                            placeholder=''
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['nationalIdentificationNumber']})}
                        />
                        {errors && errors['nationalIdentificationNumber'] &&
                        <FormFeedback>{errors['nationalIdentificationNumber'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="gender">Jenis Kelamin</Label>
                        <CustomInput
                            className={classnames({'is-invalid': errors['gender']})}
                            id="male"
                            name="gender"
                            type="radio"
                            label="Laki-laki"
                            checked={gender.gender == "MALE"}
                            onChange={() => setGender({gender: "MALE", errorMessage: null})}
                        />
                        <CustomInput
                            className={classnames({'is-invalid': errors['gender']})}
                            id="female"
                            name="gender"
                            type="radio"
                            label="Perempuan"
                            checked={gender.gender == "FEMALE"}
                            onChange={() => setGender({gender: "FEMALE", errorMessage: null})}
                        />
                        <Input
                            className={classnames('d-none', {'is-invalid': !!gender.errorMessage})}
                            name="gender"
                            innerRef={register({required: true})}/>
                        {gender.errorMessage && <FormFeedback>{gender.errorMessage}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="marriage">Status Pernikahan</Label>
                        <CustomInput
                            id="marriage"
                            name="married"
                            label="Menikah"
                            type='checkbox'
                            checked={marriage}
                            onChange={() => setMarriage(!marriage)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="religion">Agama</Label>
                        <Controller
                            defaultValue={religionOptions
                                .filter(option => option.value == employee.religion)[0]
                            }
                            rules={{required: true}}
                            control={control}
                            as={Select}
                            classNamePrefix='select'
                            isClearable
                            theme={selectThemeColors}
                            name="religion"
                            id="religion"
                            placeholder="Pilih agama"
                            options={religionOptions}
                            className={classnames('react-select', {'is-invalid': errors['religion']})}
                        />
                        {errors && errors['religion'] && <FormFeedback>{errors['religion'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for='placeOfBirth'>Tempat lahir <span className='text-danger'>*</span></Label>
                        <Input
                            defaultValue={employee.placeOfBirth}
                            name='placeOfBirth'
                            id='placeOfBirth'
                            placeholder=''
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['placeOfBirth']})}
                        />
                        {errors && errors['placeOfBirth'] &&
                        <FormFeedback>{errors['placeOfBirth'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Tanggal Lahir <span className='text-danger'>*</span></Label>
                        <Controller
                            defaultValue={[new Date(employee.dateOfBirth)]}
                            rules={{required: true}}
                            placeholder="01/01/1990"
                            options={{
                                locale: Indonesian,
                                // altInput: true,
                                // altFormat: 'j F Y',
                                dateFormat: 'd/m/Y',
                                allowInput: true
                            }}
                            as={Flatpickr}
                            control={control}
                            id='dateOfBirth'
                            name='dateOfBirth'
                            className={classnames('form-control', {'is-invalid': errors['dateOfBirth']})}
                        />
                        {errors && errors['dateOfBirth'] &&
                        <FormFeedback>{errors['dateOfBirth'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for='education'>Pendidikan Terakhir</Label>
                        <Input
                            defaultValue={employee.education}
                            name='education'
                            id='education'
                            placeholder=''
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['education']})}
                        />
                        {errors && errors['education'] &&
                        <FormFeedback>{errors['education'].message}</FormFeedback>}
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Alamat KTP<span className='text-danger'>*</span></Label>
                                <Input
                                    defaultValue={employee.addressInIdentityCard}
                                    innerRef={register({required: true})}
                                    type="textarea" rows={3}
                                    name="address"
                                    id="address"
                                    className={classnames({'is-invalid': errors['address']})}
                                />
                                {errors && errors['address'] &&
                                <FormFeedback>{errors['address'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label>Alamat Saat Ini <span className='text-danger'>*</span></Label>
                                <Input
                                    defaultValue={employee.address}
                                    innerRef={register({required: true})}
                                    type="textarea" rows={3}
                                    name="addressInIdentityCard"
                                    id="addressInIdentityCard"
                                    className={classnames({'is-invalid': errors['addressInIdentityCard']})}
                                />
                                {errors && errors['addressInIdentityCard'] &&
                                <FormFeedback>{errors['addressInIdentityCard'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="email">Email Pribadi</Label>
                                <Input
                                    defaultValue={employee.email}
                                    className={classnames({'is-invalid': errors['email']})}
                                    type="email"
                                    id="email"
                                    name="email"
                                    innerRef={register({required: true})}
                                />
                                {errors && errors['email'] && <FormFeedback>{errors['email'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="officeEmail">Email Perusahaan</Label>
                                <Input
                                    defaultValue={employee.officeEmail}
                                    className={classnames({'is-invalid': errors['officeEmail']})}
                                    type="email"
                                    id="officeEmail"
                                    name="officeEmail"
                                    innerRef={register({required: true})}
                                />
                                {errors && errors['officeEmail'] &&
                                <FormFeedback>{errors['officeEmail'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Nomor Telepon <span className='text-danger'>*</span></Label>
                                <Input
                                    defaultValue={employee.phone}
                                    innerRef={register({required: true})}
                                    name="phone"
                                    id="phone"
                                    className={classnames({'is-invalid': errors['phone']})}
                                />
                                {errors && errors['phone'] && <FormFeedback>{errors['phone'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label>Nomor Telepon 2 <span className='text-danger'>*</span></Label>
                                <Input
                                    defaultValue={employee.phone2}
                                    innerRef={register({required: true})}
                                    name="phone2"
                                    id="phone2"
                                    className={classnames({'is-invalid': errors['phone2']})}
                                />
                                {errors && errors['phone2'] && <FormFeedback>{errors['phone2'].message}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Status karyawan</Label>
                        <Controller
                            defaultValue={employeeStatusOptions.filter(option => option.value == employee.status)[0]}
                            rules={{required: true}}
                            control={control}
                            as={Select}
                            classNamePrefix='select'
                            isClearable
                            theme={selectThemeColors}
                            name="status"
                            id="status"
                            placeholder="Pilih status karyawan"
                            options={employeeStatusOptions}
                            className={classnames('react-select', {'is-invalid': errors['status']})}
                        />
                        {errors && errors['status'] && <FormFeedback>{errors['status'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Tanggal Masuk Kerja <span className='text-danger'>*</span></Label>
                        <Controller
                            defaultValue={[new Date(employee.joinDate)]}
                            rules={{required: true}}
                            placeholder="01/01/1990"
                            options={{
                                locale: Indonesian,
                                // altInput: true,
                                // altFormat: 'j F Y',
                                dateFormat: 'd/m/Y',
                                allowInput: true
                            }}
                            as={Flatpickr}
                            control={control}
                            id='joinDate'
                            name='joinDate'
                            className={classnames('form-control', {'is-invalid': errors['joinDate']})}
                        />
                        {errors && errors['joinDate'] &&
                        <FormFeedback>{errors['joinDate'].message}</FormFeedback>}
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                        <Label>Nama Bank</Label>
                        <Input
                            defaultValue={employee.bankName}
                            innerRef={register({required: true})}
                            name="bankName"
                            id="bankName"
                            className={classnames({'is-invalid': errors['bankName']})}
                        />
                        {errors && errors['bankName'] && <FormFeedback>{errors['bankName'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Cabang Bank</Label>
                        <Input
                            defaultValue={employee.bankBranch}
                            innerRef={register({required: true})}
                            name="bankBranch"
                            id="bankBranch"
                            className={classnames({'is-invalid': errors['bankBranch']})}
                        />
                        {errors && errors['bankBranch'] && <FormFeedback>{errors['bankBranch'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label>Nomor Rekening Bank</Label>
                        <Input
                            defaultValue={employee.bankAccountNumber}
                            innerRef={register({required: true})}
                            name="bankAccountNumber"
                            id="bankAccountNumber"
                            className={classnames({'is-invalid': errors['bankAccountNumber']})}
                        />
                        {errors && errors['bankAccountNumber'] &&
                        <FormFeedback>{errors['bankAccountNumber'].message}</FormFeedback>}
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                        <Label>NPWP</Label>
                        <Input
                            defaultValue={employee.taxIdentificationNumber}
                            innerRef={register({required: true})}
                            name="taxIdentificationNumber"
                            id="taxIdentificationNumber"
                            className={classnames({'is-invalid': errors['taxIdentificationNumber']})}
                        />
                        {errors && errors['taxIdentificationNumber'] &&
                        <FormFeedback>{errors['taxIdentificationNumber'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label>BPJS</Label>
                        <Input
                            defaultValue={employee.insuranceAndSocialSecurity}
                            innerRef={register({required: true})}
                            name="insuranceAndSocialSecurity"
                            id="insuranceAndSocialSecurity"
                            className={classnames({'is-invalid': errors['insuranceAndSocialSecurity']})}
                        />
                        {errors && errors['insuranceAndSocialSecurity'] &&
                        <FormFeedback>{errors['insuranceAndSocialSecurity'].message}</FormFeedback>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' className='mr-1' color='primary' onClick={
                        handleClickOfSubmit
                    }>Simpan</Button>
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

export default ModalUpdateEmployee