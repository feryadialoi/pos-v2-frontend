// @ts-ignore
import {selectThemeColors} from '@utils'
import {Button, CardBody, Col, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import {Fragment, useEffect, useState} from "react";
import Select, {NamedProps} from "react-select";
import classnames from "classnames";
import {chartOfAccountApiService} from "../../../apiservice/chart-of-account";
import {companySettingApiService} from "../../../apiservice/company-setting";
import {SelectOptions} from "../../../models/SelectOptions";
import {CompanySettingWithChartOfAccount} from "../../../models/CompanySettingWithChartOfAccount";
import {CompanySettingOfUpdateCompanySettingWithChartOfAccountRequest} from "../../../models/requests/CompanySettingOfUpdateCompanySettingWithChartOfAccountRequest";
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";


interface CompanySettingOption {
    currentSelect: SelectOptions | null
    companySetting: CompanySettingWithChartOfAccount
    select: SelectOptions | null
    selectError: string | null
}


const PurchaseTabContent = () => {

    const [companySettings, setCompanySettings] = useState<CompanySettingOption[]>([])

    const [chartOfAccountOptions, setChartOfAccountOptions] = useState<any[]>([])

    const getListChartOfAccount = async () => {
        try {
            const response = await chartOfAccountApiService.getListChartOfAccount()

            setChartOfAccountOptions(response.data.data.map(item => ({
                label: item.accountCode + " " + item.name,
                value: item.id,
            })))

        } catch (error) {
            console.log(error?.response?.data)
        }
    }

    const getListCompanySetting = async () => {
        try {
            const response = await companySettingApiService.getListCompanySettingWithChartOfAccount()
            setCompanySettings(response.data.data.map(item => ({
                companySetting: item,
                currentSelect: item.chartOfAccount == null ? null : {
                    label: item.chartOfAccount?.accountCode + " " + item.chartOfAccount?.name,
                    value: item.chartOfAccount?.id
                },
                select: item.chartOfAccount == null ? null : {
                    label: item.chartOfAccount?.accountCode + " " + item.chartOfAccount?.name,
                    value: item.chartOfAccount?.id
                },
                selectError: null
            })))
        } catch (error) {
            console.log(error?.response?.data)
        }
    }

    const loadInitialData = async () => {
        await getListChartOfAccount()
        await getListCompanySetting()
    }

    useEffect(() => {
        loadInitialData()
    }, [])


    const handleOnChangeCompanySetting = (index: number) => (value) => {
        setCompanySettings(prevState => {
            const temp = [...prevState]
            temp[index].select = value
            temp[index].selectError = null
            return temp
        })
    }

    const validateCompanySettings = () => {
        return new Promise(resolve => {
            setCompanySettings(prevState => {
                let temp = [...prevState]

                temp.filter(item => item.select == null).length > 0 ? resolve(false) : resolve(true)

                temp = temp.map((item, index) => {
                    return {...item, selectError: item.select == null ? "Kode Akun belum dipilih" : null}
                })
                return temp
            })
        })
    }

    const submitChange = async () => {

        const isCompanySettingsValid = await validateCompanySettings()
        console.log("isCompanySettingsValid", isCompanySettingsValid)

        if (isCompanySettingsValid) {
            const data = constructUpdateBodyRequest()
            console.log(data)

            try {
                const response = await companySettingApiService.updateBatchCompanySettingWithChartOfAccount(data)
                console.log(response.data.data)
                notifySuccess("Data Kode Akun berhasil diperbarui")
            } catch (error) {
                notifyError("Gagal menyimpan data kode akun")
                console.log(error?.response?.data)
            }
        }
    }

    /**
     * filtered to only has changed value
     */
    const constructUpdateBodyRequest = () => {
        return {
            companySettings: companySettings
                .filter(item => {
                    if (item.currentSelect == null) return true
                    if (item.currentSelect && item.select && item.currentSelect.value != item.select.value) return true
                })
                .map(item => ({
                    id: item.companySetting.id,
                    settingName: item.companySetting.settingName,
                    settingValue: item.select?.value!
                }))
        }
    }


    return (
        <>
            <CardBody className="overflow-auto">
                {companySettings.map((item, index) => (
                    <Fragment key={index}>
                        {/*<FormGroup>*/}
                        {/*    <Label>{item.companySetting?.displayName}</Label>*/}
                        {/*    <Select*/}
                        {/*        isClearable*/}
                        {/*        className={classnames('react-select', {'is-invalid': false})}*/}
                        {/*        placeholder="Pilih Akun"*/}
                        {/*        classNamePrefix='select'*/}
                        {/*        theme={selectThemeColors}*/}
                        {/*        id="parent"*/}
                        {/*        name="parent"*/}
                        {/*        value={item.select}*/}
                        {/*        onChange={value => handleOnChangeCompanySetting(index)(value)}*/}
                        {/*        options={chartOfAccountOptions}*/}
                        {/*    />*/}
                        {/*</FormGroup>*/}

                        <HorizontalSelect
                            label={item.companySetting.displayName}
                            placeholder="Pilih Akun"
                            isClearable
                            className={classnames({'is-invalid': item.selectError})}
                            id={item.companySetting.settingName}
                            name={item.companySetting.settingName}
                            value={item.select}
                            onChange={value => handleOnChangeCompanySetting(index)(value)}
                            options={chartOfAccountOptions}
                            errorFeedback={item.selectError}
                        />
                    </Fragment>
                ))}

                {/*<HorizontalSelect label="Hutang"/>*/}
                {/*<HorizontalSelect label="Biaya Pengiriman"/>*/}
                {/*<HorizontalSelect label="Biaya Lain-lain"/>*/}
                {/*<HorizontalSelect label="Pajak Pembelian"/>*/}
                {/*<HorizontalSelect label="Diskon Pembelian"/>*/}
                {/*<HorizontalSelect label="Retur Pembelian"/>*/}

                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button color="primary" onClick={submitChange}>Simpan</Button>
                    </Col>
                </Row>
            </CardBody>
        </>
    )
}

export default PurchaseTabContent


interface HorizontalSelectProps extends NamedProps {
    label?: string
    errorFeedback?: string | null
}

const HorizontalSelect = (props: HorizontalSelectProps) => {
    return (
        <FormGroup row>
            <Label sm='3' for='input-large-horizontal'>
                {props.label}
            </Label>
            <Col sm='9'>
                <Select{...props}
                       className={'react-select ' + props.className}
                       classNamePrefix='select'
                       theme={selectThemeColors}
                />
                {props.errorFeedback && <FormFeedback>{props.errorFeedback}</FormFeedback>}
            </Col>
        </FormGroup>
    )
}