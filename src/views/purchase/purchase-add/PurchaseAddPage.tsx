import {Fragment, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormFeedback,
    FormGroup, Input,
    Label, ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";
import BigDecimal from "js-big-decimal";
import ModalImportPurchaseOrder from "./ModalImportPurchaseOrder";
import {DetailedPurchaseOrder} from "../../../models/DetailedPurchaseOrder";
import {purchaseOrderApiService} from "../../../apiservice/purchase-order";
import DataTable from "react-data-table-component";
import '@styles/react/libs/tables/react-dataTable-component.scss'
import {ChevronDown} from "react-feather";
import columnsOfPurchaseOrderDetail from "./columnsOfPurchaseOrderDetail";
import {useLocation, useParams} from "react-router-dom";
import {urlParamsParser} from "../../../utility/url-params-util";
import classnames from "classnames";
import {Indonesian} from "flatpickr/dist/l10n/id";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {dateOfDayMonthYear} from "../../../utility/date-format-util";
import classNames from "classnames";
import {PurchaseStatus} from "../../../models/PurchaseStatus";
import NominalTitleValue from "../../component/NominalTitleValue";
import {parseFormattedValue} from "../../../utility/parse-formatted-value";
import {discountUtil} from "../../../utility/discount-util";
import {taxUtil} from "../../../utility/tax-util";


interface DueDateOptions {
    dueDate: Date | null
    dueDateError: string | null
}

interface EntryDateOptions {
    entryDate: Date | null
    entryDateError: string | null
}


interface PurchaseAddPageUrlParams {
    purchaseOrderId?: string
    hello?: string
}

interface PurchaseAddPageLocationState {
    purchaseOrderId?: string
}

const PurchaseAddPage = () => {

    const [isModalImportPurchaseOrderVisible, setIsModalImportPurchaseOrderVisible] = useState(false)

    const [detailedPurchaseOrder, setDetailedPurchaseOrder] = useState<DetailedPurchaseOrder | null>(null)

    const [entryDate, setEntryDate] = useState<EntryDateOptions>({
        entryDate: dateOfDayMonthYear(new Date()),
        entryDateError: null,
    })

    const [dueDate, setDueDate] = useState<DueDateOptions>({
        dueDate: dateOfDayMonthYear(new Date()),
        dueDateError: null
    })

    const [shippingFee, setShippingFee] = useState("0")

    const [otherFee, setOtherFee] = useState("0")

    const location = useLocation<PurchaseAddPageLocationState>()

    const getPurchaseOrder = (purchaseOrderId: string) => {
        purchaseOrderApiService.getPurchaseOrder(purchaseOrderId)
            .then(response => {
                setDetailedPurchaseOrder(response.data.data)
                console.log(response.data.data)
                mappingPurchaseOrderToPurchase(response.data.data)
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }

    const mappingPurchaseOrderToPurchase = (purchaseOrder: DetailedPurchaseOrder) => {
        setOtherFee(purchaseOrder.otherFee.toString())
        setShippingFee(purchaseOrder.shippingFee.toString())
    }

    useEffect(() => {

        console.log('location', location)

        if (location.state?.purchaseOrderId) {
            getPurchaseOrder(location.state.purchaseOrderId)
        }

    }, [])

    const handleOnChangeEntryDate = (value: Date[]) => {
        const date = value[0]
        setEntryDate(prevState => {
            return {...prevState, entryDate: date}
        })

        if (dueDate.dueDate! < date) {
            setDueDate(prevState => {
                return {dueDate: date, dueDateError: null}
            })
        }
    }

    const calculateSumOfDiscount = () => {
        return detailedPurchaseOrder?.purchaseOrderDetails
            .reduce((acc, cur) => {
                const priceInBigDecimal = new BigDecimal(cur.price)
                const discountInBigDecimal = new BigDecimal(cur.discount)
                const quantityInBigDecimal = new BigDecimal(cur.quantity)

                const calculatedDiscountInBigDecimal = discountUtil.calculate(priceInBigDecimal, discountInBigDecimal, cur.discountFormat)

                return acc.add(calculatedDiscountInBigDecimal.multiply(quantityInBigDecimal))

            }, new BigDecimal("0"))
            .getValue() || "0"
    }

    const calculateSumOfTax = () => {
        return detailedPurchaseOrder?.purchaseOrderDetails.reduce((acc, cur) => {
            const priceInBigDecimal = new BigDecimal(cur.price)
            const discountInBigDecimal = new BigDecimal(cur.discount)
            const quantityInBigDecimal = new BigDecimal(cur.quantity)
            const taxInBigDecimal = new BigDecimal(cur.tax)

            const discountedPriceInBigDecimal = discountUtil.calculate(priceInBigDecimal, discountInBigDecimal, cur.discountFormat)

            const calculatedTaxInBigDecimal = discountUtil.calculate(discountedPriceInBigDecimal, taxInBigDecimal, cur.discountFormat)

            return acc.add(calculatedTaxInBigDecimal.multiply(quantityInBigDecimal))

        }, new BigDecimal("0")).getValue() || "0"
    }

    const calculateSubtotal = () => {
        return detailedPurchaseOrder?.purchaseOrderDetails.reduce((acc, cur) => {
                const priceInBigDecimal = new BigDecimal(cur.price)
                const quantityInBigDecimal = new BigDecimal(cur.quantity)
                const taxInBigDecimal = new BigDecimal(cur.tax)
                const discountInBigDecimal = new BigDecimal(cur.discount)
                const subtotal = quantityInBigDecimal.multiply(priceInBigDecimal.add(taxInBigDecimal).subtract(discountInBigDecimal))
                return acc.add(subtotal)
            }, new BigDecimal("0"))
            .add(new BigDecimal(detailedPurchaseOrder?.shippingFee || "0"))
            .add(new BigDecimal(detailedPurchaseOrder?.otherFee || "0"))
            .getValue() || "0"
    }

    const calculateGrandTotal = () => {
        return detailedPurchaseOrder?.purchaseOrderDetails.reduce((acc, cur) => {
            const priceInBigDecimal = new BigDecimal(cur.price)
            const quantityInBigDecimal = new BigDecimal(cur.quantity)
            const subtotal = quantityInBigDecimal.multiply(priceInBigDecimal)

            return acc.add(subtotal)
        }, new BigDecimal("0")).getValue() || "0"
    }

    return (
        <Fragment>
            <ModalImportPurchaseOrder
                isOpen={isModalImportPurchaseOrderVisible}
                toggleModal={() => setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)}
                toggleHeader={() => setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)}
                onSelectPurchaseOrder={purchaseOrder => {
                    getPurchaseOrder(purchaseOrder.id)
                    setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)
                }}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Pembelian</CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Kode Pembelian</Label>
                                <Input readOnly defaultValue={"auto"}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Referensi</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <FormGroup>
                                <Button color="primary" onClick={() => {
                                    setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)
                                }}>Import PO</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="hf-picker">Tanggal Transaksi</Label>
                                <Flatpickr
                                    value={entryDate.entryDate}
                                    onChange={handleOnChangeEntryDate}
                                    id='hf-picker'
                                    className={classnames('form-control', {'is-invalid': entryDate.entryDateError})}
                                    options={{
                                        locale: Indonesian,
                                        altInput: true,
                                        altFormat: 'j F Y',
                                        dateFormat: 'Y-m-d',
                                        allowInput: true
                                    }}
                                />
                                {entryDate.entryDateError &&
                                <FormFeedback>{entryDate.entryDateError}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Tanggal Jatuh Tempo</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Supplier</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Tipe Pembayaran</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Biaya Pengiriman</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Keterangan Biaya Pengiriman</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Biaya Lain-lain</Label>
                                <Input/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Keterangan Biaya Lain-lain</Label>
                                <Input/>
                            </FormGroup>
                        </Col>

                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <p>{detailedPurchaseOrder?.code}</p>
                        </Col>
                    </Row>
                </CardBody>

                {detailedPurchaseOrder && <DataTable
                    highlightOnHover
                    noHeader
                    responsive
                    columns={columnsOfPurchaseOrderDetail}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    data={detailedPurchaseOrder.purchaseOrderDetails.map((item, index) => ({...item, no: index + 1}))}
                />}
            </Card>
            <Card>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label>Catatan</Label>
                                <Input type="textarea" rows={3}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <NominalTitleValue valueSize="lg" title="Diskon" value={calculateSumOfDiscount()}/>
                            <NominalTitleValue valueSize="lg" title="Pajak" value={calculateSumOfTax()}/>
                            <NominalTitleValue valueSize="lg" title="Biaya Pengiriman"
                                               value={parseFormattedValue(shippingFee)}/>
                            <NominalTitleValue valueSize="lg" title="Biaya Lain-lain"
                                               value={parseFormattedValue(otherFee)}/>
                            <NominalTitleValue valueSize="lg" title="Total" value={calculateSubtotal()}/>
                            <NominalTitleValue valueSize="lg" title="Grand Total" value={calculateGrandTotal()}/>
                        </Col>
                        <Col md={12} className="d-flex justify-content-end">
                            <Button color="primary">Simpan</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default PurchaseAddPage