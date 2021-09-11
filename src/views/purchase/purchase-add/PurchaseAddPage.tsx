// @ts-ignore
import {selectThemeColors} from '@utils'
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
import {useLocation, useParams, useHistory} from "react-router-dom";
import {urlParamsParser} from "../../../utility/url-params-util";
import classnames from "classnames";
import {Indonesian} from "flatpickr/dist/l10n/id";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {dateOfDayMonthYear, formatDateToCommonFormat} from "../../../utility/date-format-util";
import classNames from "classnames";
import {PurchaseStatus} from "../../../models/PurchaseStatus";
import NominalTitleValue from "../../component/NominalTitleValue";
import {parseFormattedValue} from "../../../utility/parse-formatted-value";
import {discountUtil} from "../../../utility/discount-util";
import {taxUtil} from "../../../utility/tax-util";
import {PurchaseOrder} from "../../../models/PurchaseOrder";
import {SelectOptions} from "../../../models/SelectOptions";
import {ProductPurchaseOrderOptions} from "../purchase-order-add/PurchaseOrderAddPage";
import CurrencyInput from "react-currency-input-field";
import {sanitizeCurrencyInput} from "../../../utility/currency-input-util";
import Select from "react-select";
import {addDays} from "../../../utility/date-util";
import {DateTime, DurationUnits} from "luxon"
import {supplierApiService} from "../../../apiservice/supplier";
import {Supplier} from "../../../models/Supplier";
import {purchaseApiService} from "../../../apiservice/purchase";
import {CreatePurchaseRequest} from "../../../models/requests/CreatePurchaseRequest";
import {PaymentType} from "../../../models/PaymentType";
import {notifySuccess} from "../../component/SuccessToast";
import {notifyError} from "../../component/ErrorToast";

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

interface SupplierOptions {
    supplier: SelectOptions | null
    supplierError: string | null
}

const paymentOptions: any[] = [
    {label: "CASH", value: "CASH"},
    {label: "CREDIT", value: "CREDIT"},
]

interface PaymentTypeOptions {
    paymentType: SelectOptions | null
    paymentTypeError: string | null
}


const PurchaseAddPage = () => {


    const [isModalImportPurchaseOrderVisible, setIsModalImportPurchaseOrderVisible] = useState(false)

    const [detailedPurchaseOrder, setDetailedPurchaseOrder] = useState<DetailedPurchaseOrder | null>(null)

    // ** local state of page ------------->

    const [suppliers, setSuppliers] = useState<SelectOptions[]>([])

    const [warehouses, setWarehouses] = useState<SelectOptions[]>([])

    // ** local state of page ------------->


    // ** local state of purchase --------->

    const [entryDate, setEntryDate] = useState<EntryDateOptions>({
        // entryDate: dateOfDayMonthYear(new Date()),
        entryDate: null,
        entryDateError: null,
    })

    const [dueDate, setDueDate] = useState<DueDateOptions>({
        // dueDate: dateOfDayMonthYear(new Date()),
        dueDate: null,
        dueDateError: null
    })

    const [dueDateDayCount, setDueDateDayCount] = useState(0)

    const [shippingFee, setShippingFee] = useState("0")

    const [shippingFeeDescription, setShippingFeeDescription] = useState("")

    const [otherFee, setOtherFee] = useState("0")

    const [otherFeeDescription, setOtherFeeDescription] = useState("")

    const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null)

    const [supplier, setSupplier] = useState<SupplierOptions>({
        supplier: null,
        supplierError: null,
    })

    const [paymentType, setPaymentType] = useState<PaymentTypeOptions>({
        paymentType: null,
        paymentTypeError: null
    })

    const [reference, setReference] = useState("")

    const [note, setNote] = useState("")

    const [products, setProducts] = useState<ProductPurchaseOrderOptions[]>([])

    const [productsError, setProductsError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    // ** local state of purchase --------->


    // ** method -------------------------->

    const location = useLocation<PurchaseAddPageLocationState | undefined>()
    const history = useHistory()

    const getPurchaseOrder = (purchaseOrderId: string) => {
        purchaseOrderApiService.getPurchaseOrder(purchaseOrderId)
            .then(response => mappingPurchaseOrderToPurchase(response.data.data))
            .catch(error => console.error(error?.response?.data))
    }

    const mappingPurchaseOrderToPurchase = (purchaseOrder: DetailedPurchaseOrder) => {
        setShippingFee(purchaseOrder.shippingFee.toString())
        setShippingFeeDescription(purchaseOrder.shippingFeeDescription)
        setOtherFee(purchaseOrder.otherFee.toString())
        setOtherFeeDescription(purchaseOrder.otherFeeDescription)
        setPurchaseOrder(purchaseOrder as any)
        setSupplier({
            supplier: {value: purchaseOrder.supplier.id, label: purchaseOrder.supplier.name},
            supplierError: null,
        })
        setEntryDate(() => {
            return {entryDate: new Date(purchaseOrder.entryDate), entryDateError: null}
        })
        setDueDate(() => {
            return {dueDate: new Date(purchaseOrder.dueDate), dueDateError: null}
        })
        setPaymentType({
            paymentType: {value: purchaseOrder.paymentType, label: purchaseOrder.paymentType},
            paymentTypeError: null
        })
        setProducts(() => {
            return purchaseOrder.purchaseOrderDetails.map(purchaseOrderDetail => ({
                tax: purchaseOrderDetail.tax.toString(),
                taxFormat: purchaseOrderDetail.taxFormat,
                discount: purchaseOrderDetail.discount.toString(),
                discountFormat: purchaseOrderDetail.discountFormat,
                price: purchaseOrderDetail.price.toString(),
                priceError: null,
                product: purchaseOrderDetail.product,
                warehouse: {value: purchaseOrderDetail.warehouse.id, label: purchaseOrderDetail.warehouse.name},
                warehouseError: null,
                quantity: purchaseOrderDetail.quantity.toString(),
                quantityError: null,
                unitError: null,
                unit: {value: purchaseOrderDetail.unit.id, label: purchaseOrderDetail.unit.name},
                units: purchaseOrderDetail.product.units,
            }))
        })
    }

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

    const handleOnChangePaymentType = (option) => {
        setPaymentType(prevState => ({
            ...prevState, paymentType: option
        }))
        /**
         * validate only when onchange with selected value, not when clear value
         */
        if (option) validatePaymentType().then(r => console.log("validateOnChangeEvent", r))

    }

    const validateSupplier = () => {
        const SUPPLIER_NOT_SELECTED = "Supplier belum dipilih"
        return new Promise<boolean>(resolve => {
            setSupplier(prevState => {
                if (prevState.supplier == null) resolve(false)
                else resolve(true)

                return {...prevState, supplierError: prevState.supplier == null ? SUPPLIER_NOT_SELECTED : null}
            })
        })
    }

    const validatePaymentType = () => {
        const PAYMENT_TYPE_NOT_SELECTED = "Tipe Pembayaran belum dipilih"
        return new Promise<boolean>(resolve => {
            setPaymentType(prevState => {
                if (prevState.paymentType == null) resolve(false)
                else resolve(true)

                return {
                    ...prevState,
                    paymentTypeError: prevState.paymentType == null ? PAYMENT_TYPE_NOT_SELECTED : null
                }
            })
        })
    }

    const validateEntryDate = () => {
        return new Promise<boolean>(resolve => {
            setEntryDate(prevState => {
                if (prevState.entryDate == null) {
                    resolve(false)
                    return {...prevState, entryDateError: "Tanggal Transaksi belum dipilih"}
                }
                resolve(true)
                return prevState
            })
        })
    }

    const validateDueDate = () => {
        return new Promise<boolean>(resolve => {

            if (paymentType.paymentType?.value == "CREDIT") {
                setDueDate(prevState => {
                    if (prevState.dueDate == null) {
                        resolve(false)
                        return {...prevState, dueDateError: "Tanggal Jatuh Tempo belum dipilih"}
                    }

                    if (prevState.dueDate < entryDate.entryDate!) {
                        resolve(false)
                        return {...prevState, dueDateError: "Tanggal Jatuh Tempo tidak boleh dibawah tanggal transaksi"}
                    }

                    resolve(true)
                    return {...prevState, dueDateError: null}
                })
            } else {
                resolve(true)
            }
        })
    }

    const validateProducts = () => {
        return new Promise<boolean>(resolve => {
            if (products.length == 0) {
                setProductsError("Belum ada produk")
                resolve(false)
            }

            setProducts(prevState => {
                const temp = [...prevState].map((item, i) => {
                    return ({
                        ...item,
                        priceError: item.price == "0" || item.price == "" ? "Harga belum diisi" : null,
                        quantityError: item.quantity == "0" || item.quantity == "" ? "Quantity belum diisi" : null,
                        unitError: item.unit == null ? "Unit belum diisi" : null,
                        warehouseError: item.warehouse == null ? "Gudang belum diisi" : null,
                    })
                })

                if (temp.filter(item =>
                    item.priceError != null ||
                    item.quantityError != null ||
                    item.unitError != null ||
                    item.warehouseError != null
                ).length > 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }

                return temp
            })
        })
    }

    const validateForSubmit = async () => {
        const isSupplierValid = await validateSupplier()

        const isPaymentTypeValid = await validatePaymentType()

        const isEntryDateValid = await validateEntryDate()

        const isDueDateValid = await validateDueDate()

        const isProductsValid = await validateProducts()

        return {isSupplierValid, isPaymentTypeValid, isEntryDateValid, isDueDateValid, isProductsValid}
    }

    const handleOnChangeSupplier = (option) => {
        setSupplier(prevState => ({
            ...prevState, supplier: option
        }))
        /**
         * validate only when onchange with selected value, not when clear value
         */
        if (option) validateSupplier().then(r => console.log("validateOnChangeEvent", r))
    }

    const handleOnChangeOtherFee = (value) => {
        sanitizeCurrencyInput(value, setOtherFee)
    }

    const handleOnChangeShippingFee = (value) => {
        sanitizeCurrencyInput(value, setShippingFee)
    }

    const handleOnChangeDueDate = (value: Date[]) => {
        console.log(value)
        console.log(entryDate.entryDate)
        const date = value[0]
        setDueDate(prevState => {

            const dueDateInLuxon = DateTime.fromJSDate(date)
            const entryDateInLuxon = DateTime.fromJSDate(entryDate.entryDate!)
            const diff = dueDateInLuxon.diff(entryDateInLuxon, "days")
            const newDueDateDayCount = diff.days

            setDueDateDayCount(newDueDateDayCount)

            return {...prevState, dueDate: date}
        })
    }

    const handleOnChangeDueDateDayCount = (event) => {
        setDueDateDayCount(() => {

            const dayCount = parseInt(event.target.value)

            const newDueDate = addDays(entryDate.entryDate!, dayCount)

            setDueDate({
                dueDate: newDueDate,
                dueDateError: null
            })

            return dayCount
        })
    }

    const handleOnSelectImportPurchaseOrder = (purchaseOrder: PurchaseOrder) => {
        setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)
        history.replace("/purchases/add")
        getPurchaseOrder(purchaseOrder.id)
    }

    const mapSuppliersToSuppliersOptions = (suppliers: Supplier[]) => {
        return suppliers.map(supplier => ({
            label: supplier.name,
            value: supplier.id
        }))
    }

    const getSuppliers = () => {
        supplierApiService.getListSupplier()
            .then(response => setSuppliers(mapSuppliersToSuppliersOptions(response.data.data)))
            .catch(error => console.log(error?.response?.data))
    }

    const getPurchaseOrderId = () => {
        if (purchaseOrder) return purchaseOrder.id
        return null
    }

    const getPurchaseStatus = (): PurchaseStatus => {
        if (paymentType.paymentType?.value == "CASH") {
            return "PAID"
        } else if (paymentType.paymentType?.value == "CREDIT") {
            return "UNPAID";
        } else {
            // default value case
            return "UNPAID";
        }
    }

    const gotoPurchaseViewPage = (purchaseId: string) => {
        history.push("/purchases/view/" + purchaseId)
    }

    const doCreatePurchase = () => {
        setIsLoading(true)
        const createPurchaseRequest: CreatePurchaseRequest = {
            status: getPurchaseStatus(),
            supplierId: supplier.supplier!.value,
            purchaseOrderId: getPurchaseOrderId(),
            entryDate: formatDateToCommonFormat(entryDate.entryDate!),
            term: dueDateDayCount,
            dueDate: formatDateToCommonFormat(dueDate.dueDate!),
            reference: reference,
            note: note,
            paymentType: paymentType.paymentType!.value as PaymentType,
            shippingFee: parseFloat(parseFormattedValue(shippingFee)),
            shippingFeeDescription: shippingFeeDescription,
            otherFee: parseFloat(parseFormattedValue(otherFee)),
            otherFeeDescription: otherFeeDescription,
            products: products.map(product => {
                return {
                    productId: product.product.id,
                    warehouseId: product.warehouse?.value!,
                    price: parseFloat(parseFormattedValue(product.price)),
                    quantity: parseFloat(parseFormattedValue(product.quantity)),
                    unitId: product.unit?.value!,
                    discount: parseFloat(parseFormattedValue(product.discount)),
                    discountFormat: product.discountFormat,
                    tax: parseFloat(parseFormattedValue(product.tax)),
                    taxFormat: product.taxFormat,
                }
            })
        }

        purchaseApiService.createPurchase(createPurchaseRequest)
            .then(response => {
                notifySuccess("Pembelian berhasil dibuat")
                gotoPurchaseViewPage(response.data.data.id)
            })
            .catch(error => {
                notifyError(error?.response?.error)
                console.error(error?.response)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const createPurchase = async () => {
        const {
            isProductsValid,
            isPaymentTypeValid,
            isEntryDateValid,
            isDueDateValid,
            isSupplierValid
        } = await validateForSubmit()

        const valid = isProductsValid &&
            isPaymentTypeValid &&
            isEntryDateValid &&
            isDueDateValid &&
            isSupplierValid

        if (valid) {
            doCreatePurchase()
        }


    }

    // ** method -------------------------->


    // ** livecycle hook ------------------>

    useEffect(() => {

        console.log('location', location)

        if (location.state?.purchaseOrderId) {
            getPurchaseOrder(location.state.purchaseOrderId)
        }

        getSuppliers()

        setIsLoading(false)

    }, [])


    // ** livecycle hook ------------------>


    // ** render view --------------------->
    return (
        <Fragment>
            <ModalImportPurchaseOrder
                isOpen={isModalImportPurchaseOrderVisible}
                toggleModal={() => setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)}
                toggleHeader={() => setIsModalImportPurchaseOrderVisible(!isModalImportPurchaseOrderVisible)}
                onSelectPurchaseOrder={handleOnSelectImportPurchaseOrder}
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
                        <Col>
                            <FormGroup>
                                <Label for="supplier">Supplier</Label>
                                <Select
                                    id="supplier"
                                    name="supplier"
                                    className={classnames('react-select', {'is-invalid': supplier.supplierError})}
                                    classNamePrefix='select'
                                    isClearable
                                    placeholder="Pilih Supplier"
                                    theme={selectThemeColors}
                                    options={suppliers}
                                    value={supplier.supplier}
                                    onChange={handleOnChangeSupplier}
                                />
                                {supplier.supplierError && <FormFeedback>{supplier.supplierError}</FormFeedback>}
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
                        <Col>
                            <FormGroup>
                                <Label>Lama Jatuh Tempo</Label>
                                <Input type="number" min={1} value={dueDateDayCount}
                                       onChange={handleOnChangeDueDateDayCount}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="hf-picker">Tanggal Jatuh Tempo</Label>
                                <Flatpickr
                                    value={dueDate.dueDate}
                                    onChange={handleOnChangeDueDate}
                                    id='hf-picker'
                                    className={classnames('form-control', {'is-invalid': dueDate.dueDateError})}
                                    options={{
                                        locale: Indonesian,
                                        altInput: true,
                                        altFormat: 'j F Y',
                                        dateFormat: 'Y-m-d',
                                        minDate: entryDate.entryDate,
                                        allowInput: true
                                    }}
                                />
                                {dueDate.dueDateError && <FormFeedback>{dueDate.dueDateError}</FormFeedback>}
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup>
                                <Label for="payment-type">Tipe Pembayaran</Label>
                                <Select
                                    id="payment-type"
                                    name="payment-type"
                                    className={classnames('react-select', {'is-invalid': paymentType.paymentTypeError})}
                                    classNamePrefix='select'
                                    isClearable
                                    placeholder="Pilih tipe pembayaran"
                                    theme={selectThemeColors}
                                    options={paymentOptions}
                                    value={paymentType.paymentType}
                                    onChange={handleOnChangePaymentType}
                                />
                                {paymentType.paymentTypeError &&
                                <FormFeedback>{paymentType.paymentTypeError}</FormFeedback>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Biaya Pengiriman</Label>
                                <CurrencyInput
                                    className="form-control"
                                    name="quantity"
                                    placeholder="10.000"
                                    defaultValue={1}
                                    decimalsLimit={2}
                                    groupSeparator={"."}
                                    decimalSeparator={","}
                                    value={shippingFee}
                                    onValueChange={handleOnChangeShippingFee}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Keterangan Biaya Pengiriman</Label>
                                <Input type="textarea" rows={3} value={shippingFeeDescription}
                                       onChange={(event) => setShippingFeeDescription(event.target.value)}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Biaya Lain-lain</Label>
                                <CurrencyInput
                                    className="form-control"
                                    name="quantity"
                                    placeholder="10.000"
                                    defaultValue={1}
                                    decimalsLimit={2}
                                    groupSeparator={"."}
                                    decimalSeparator={","}
                                    value={otherFee}
                                    onValueChange={handleOnChangeOtherFee}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Keterangan Biaya Lain-lain</Label>
                                <Input type="textarea" rows={3} value={otherFeeDescription}
                                       onChange={(event) => setOtherFeeDescription(event.target.value)}/>
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

                <DataTable
                    highlightOnHover
                    noHeader
                    responsive
                    columns={columnsOfPurchaseOrderDetail}
                    sortIcon={<ChevronDown/>}
                    className='react-dataTable'
                    data={products.map((item, index) => ({...item, no: index + 1}))}
                />

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
                        <Col md={12} className="d-flex justify-content-end" onClick={createPurchase}>
                            <Button color="primary">Simpan</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default PurchaseAddPage