// @ts-ignore
import {selectThemeColors} from '@utils'
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
import {useForm, Controller} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";
import {useEffect, useState} from "react";
import {ChartOfAccount} from "../../../models/ChartOfAccount";
import {chartOfAccountApiService} from "../../../apiservice/chart-of-account";
import {Page} from "../../../models/Page";
import {initialPage} from "../../../redux/reducers/constant";
import Select from "react-select";
import {SelectOptions} from "../../../models/SelectOptions";

interface ModalAddChartOfAccountProps {
    isOpen: boolean
    modalToggle: () => void
    headerToggle: () => void
    onClick: () => void
    onClose: () => void
}

interface NormalBalanceOption {
    normalBalance: SelectOptions | null
    normalBalanceError: string | null
}

const normalBalanceOptions = [
    {label: "DEBIT", value: "DEBIT"},
    {label: "CREDIT", value: "CREDIT"},
]


const ModalAddChartOfAccount = ({modalToggle, headerToggle, onClick, onClose, isOpen}: ModalAddChartOfAccountProps) => {
    const [pageOfCoa, setPageOfCoa] = useState<Page<ChartOfAccount>>(initialPage)
    const [normalBalanceOption, setNormalBalanceOption] = useState<NormalBalanceOption>({
        normalBalance: null,
        normalBalanceError: null
    })


    const SignupSchema = yup.object().shape({
        name: yup.string().required("Nama belum diisi"),
        accountCode: yup.string().required("Kode akun belum diisi"),
    })

    const {register, errors, handleSubmit, control} = useForm({mode: 'onChange', resolver: yupResolver(SignupSchema)})

    const getChartOfAccounts = () => {
        chartOfAccountApiService.getChartOfAccounts({
            levelGreaterThanOrEqual: 1,
            levelLessThanOrEqual: 2
        })
            .then((response) => {
                setPageOfCoa(response.data.data)
            })
            .catch((error) => {
                console.log(error?.response?.data)
            })
    }

    useEffect(() => {
        getChartOfAccounts()
    }, [isOpen])

    const coaOptions = () => {
        return pageOfCoa.content.map(coa => {
            return ({
                label: coa.name,
                value: coa.id,
            })
        })
    }

    const onSubmit = (data) => {
        console.log(data)
        setNormalBalanceOption({
            normalBalance: data.normalBalance,
            normalBalanceError: data && data.normalBalance ? null : "Saldo normal belum dipilih"
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
                <ModalHeader toggle={headerToggle}>Tambah Kode Akun</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Akun</Label>
                        <Select
                            isClearable
                            className={classnames('react-select', {'is-invalid': false})}
                            placeholder="Pilih Akun"
                            classNamePrefix='select'
                            theme={selectThemeColors}
                            id="parent"
                            name="parent"
                            innerRef={register()}
                            options={coaOptions()}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='name'>Nama <span className='text-danger'>*</span></Label>
                        <Input
                            autoFocus={true}
                            name='name'
                            id='name'
                            placeholder='Nama Kode Akun'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['name']})}
                        />
                        {errors && errors['name'] && <FormFeedback>{errors['name'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for='accountCode'>Kode Akun <span className='text-danger'>*</span></Label>
                        <Input
                            type="number"
                            name='accountCode'
                            id='accountCode'
                            placeholder='Kode Akun'
                            innerRef={register({required: true})}
                            className={classnames({'is-invalid': errors['accountCode']})}
                        />
                        {errors && errors['accountCode'] &&
                        <FormFeedback>{errors['accountCode'].message}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="normalBalance">Saldo Normal <span className='text-danger'>*</span></Label>
                        <Controller
                            defaultValue={null}
                            isClearable
                            as={Select}
                            control={control}
                            id="normalBalance"
                            name="normalBalance"
                            options={normalBalanceOptions}
                            className={classnames('react-select', {'is-invalid': normalBalanceOption.normalBalanceError})}
                            classNamePrefix='select'
                            theme={selectThemeColors}
                        />
                        {normalBalanceOption.normalBalanceError &&
                        <FormFeedback>{normalBalanceOption.normalBalanceError}</FormFeedback>}
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

export default ModalAddChartOfAccount