// @ts-ignore
import {selectThemeColors} from '@utils'
import {Fragment, useEffect, useState} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, CustomInput, DropdownItem, DropdownMenu, DropdownToggle,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row, UncontrolledButtonDropdown, UncontrolledTooltip
} from "reactstrap";
import Select from "react-select";
import classnames from "classnames";
import {Indonesian} from "flatpickr/dist/l10n/id";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ModalSelectProduct from "../../component/modal-select-product/ModalSelectProduct";
import {Product} from "../../../models/Product";
import BigDecimal from "js-big-decimal";
import CurrencyInput, {formatValue} from "react-currency-input-field";
import {Edit, RotateCcw, Search, Trash, Upload} from "react-feather";
import {notifyWarning} from "../../component/WarningToast";
import 'uppy/dist/uppy.css'
import '@uppy/status-bar/dist/style.css'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import {notifySuccess} from "../../component/SuccessToast";
import {dateOfDayMonthYear, formatDateToCommonFormat} from "../../../utility/date-format-util";
import {supplierApiService} from "../../../apiservice/supplier";
import {SelectOptions} from "../../../models/SelectOptions";
import {PaymentType} from "../../../models/PaymentType";
import {
    CreatePurchaseOrderRequest
} from "../../../models/requests/CreatePurchaseOrderRequest";
import {notifyError} from "../../component/ErrorToast";
import {sanitizeCurrencyInput} from "../../../utility/currency-input-util";
import ModalHistoryPrice, {HistoryPriceParam} from "./ModalHistoryPrice";
import {purchaseOrderApiService} from "../../../apiservice/purchase-order";
import {PurchaseOrderStatus} from "../../../models/PurchaseOrderStatus";
import {useHistory} from "react-router-dom";
import NominalTitleValue from "../../component/NominalTitleValue";
import {Unit} from "../../../models/Unit";
import DataTable from "react-data-table-component";
import '@styles/react/libs/tables/react-dataTable-component.scss'
// @ts-ignore
import UILoader from '@components/ui-loader'
import UILoaderLoaderMessage from "../../component/UILoaderLoaderMessage";
import ModalEditProductPurchaseOrder from "./ModalEditProductPurchaseOrder";
import {ProductOfCreatePurchaseOrderRequest} from "../../../models/requests/ProductOfCreatePurchaseOrderRequest";
import {parseFormattedValue, parseValueToFormatted} from '../../../utility/parse-formatted-value';
import {warehouseApiService} from "../../../apiservice/warehouse";
import TableActionButton from "../../component/table-action-button";
import {TaxFormat} from "../../../models/TaxFormat";
import {DiscountFormat} from "../../../models/DiscountFormat";
import {type} from "os";


const paymentOptions: any[] = [
    {label: "CASH", value: "CASH"},
    {label: "CREDIT", value: "CREDIT"},
]

export interface ProductPurchaseOrder {
    product: Product
    price: string
    quantity: string
    discount: string
    tax: string
}

interface SupplierOptions {
    supplier: SelectOptions | null
    supplierError: string | null
}

interface PaymentTypeOptions {
    paymentType: SelectOptions | null
    paymentTypeError: string | null
}

interface DueDateOptions {
    dueDate: Date | null
    dueDateError: string | null
}

interface EntryDateOptions {
    entryDate: Date | null
    entryDateError: string | null
}

// todo history price
// note discount and tax still cause wrong calculation due to missing format value


export interface ProductPurchaseOrderOptions {
    product: Product
    warehouse: SelectOptions | null
    warehouseError: string | null
    price: string
    priceError: string | null
    quantity: string
    quantityError: string | null
    discount: string
    discountFormat: DiscountFormat
    tax: string
    taxFormat: TaxFormat
    units: Unit[]
    unit: SelectOptions | null
    unitError: string | null
}

export interface ProductPurchaseOrderToEditInModal {
    productToEdit: ProductPurchaseOrderOptions
    index: number
}

const PurchaseOrderAddPage = () => {

    const [isModalSelectProductVisible, setIsModalSelectProductVisible] = useState(false)

    const [isModalHistoryPriceVisible, setIsModalHistoryPriceVisible] = useState(false)

    const [productPurchaseOrderToEditInModal, setProductPurchaseOrderToEditInModal] = useState<ProductPurchaseOrderToEditInModal>({
        productToEdit: {
            product: {
                name: "",
                id: "",
                units: [],
                brand: {
                    name: "",
                    id: ""
                },
                category: {
                    name: "",
                    id: ""
                },
                code: "",
                unitConversions: []
            },
            warehouse: null,
            warehouseError: null,
            price: "",
            priceError: null,
            quantity: "",
            quantityError: null,
            discount: "",
            discountFormat: "AMOUNT",
            tax: "",
            taxFormat: "PERCENT",
            units: [],
            unit: null,
            unitError: null,
        },
        index: 0
    })

    const [isLoading, setIsLoading] = useState(true)

    const [isModalEditProductPurchaseOrderVisible, setIsModalEditProductPurchaseOrderVisible] = useState(false)

    const [historyPriceParam, setHistoryPriceParam] = useState<HistoryPriceParam>({
        supplierId: "",
        productId: "",
        unitId: "",
    })

    const [suppliers, setSuppliers] = useState<any[]>([])

    const [supplier, setSupplier] = useState<SupplierOptions>({
        supplier: null,
        supplierError: null,
    })

    const [warehouses, setWarehouses] = useState<any[]>([])

    const [paymentType, setPaymentType] = useState<PaymentTypeOptions>({
        paymentType: null,
        paymentTypeError: null,
    })

    const [reference, setReference] = useState("")

    const [note, setNote] = useState("")

    const [products, setProducts] = useState<ProductPurchaseOrderOptions[]>([])

    const [productsError, setProductsError] = useState<string | null>(null)

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

    const [shippingFeeDescription, setShippingFeeDescription] = useState("")

    const [otherFeeDescription, setOtherFeeDescription] = useState("")

    const history = useHistory()

    const loadSuppliers = () => {
        return supplierApiService.getListSupplier()
            .then(response => {
                const temp = response.data.data.map(supplier => ({
                    label: supplier.name,
                    value: supplier.id,
                }))
                setSuppliers(temp)
            })
            .catch(error => {
                console.error("PurchaseOrderAddPage.loadSuppliers.supplierApiService.getListSupplier", error?.response?.data)
            })
    }

    const loadWarehouses = () => {
        return warehouseApiService.getListWarehouse()
            .then(response => {
                const temp = response.data.data.map(warehouse => ({
                    label: warehouse.name,
                    value: warehouse.id,
                }))

                console.log(temp)
                setWarehouses(temp)
            })
            .catch(error => {
                console.error("PurchaseOrderAddPage.loadWarehouses.supplierApiService.getListSupplier", error?.response?.data)
            })
    }

    const onClickSelectedProduct = (product: Product) => {
        setProducts(prevState => {
            if (prevState.filter(p => p.product.id === product.id).length > 0) {
                notifyWarning("Produk sudah ada")
                return prevState
            }

            setProductsError(null)

            setIsModalSelectProductVisible(false)

            notifySuccess("Produk berhasil ditambah")

            const item: ProductPurchaseOrderOptions = {
                product: product,
                warehouse: null,
                warehouseError: null,
                quantity: "1",
                quantityError: null,
                discount: "0",
                discountFormat: "PERCENT",
                price: "0",
                priceError: null,
                tax: "0",
                taxFormat: "PERCENT",
                units: product.units,
                unit: null,
                unitError: null
            }
            return [...prevState, item]
        })
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

    const handleOnChangePaymentType = (option) => {
        setPaymentType(prevState => ({
            ...prevState, paymentType: option
        }))
        /**
         * validate only when onchange with selected value, not when clear value
         */
        if (option) validatePaymentType().then(r => console.log("validateOnChangeEvent", r))

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

    const handleOnChangeDueDate = (value: Date[]) => {
        console.log(value)
        console.log(entryDate.entryDate)
        const date = value[0]
        setDueDate(prevState => {
            return {...prevState, dueDate: date}
        })
    }

    const handleOnChangeProductQuantity = (index: number) => (value: any) => {
        sanitizeCurrencyInput(value, (result) => {
            setProducts(prevState => {
                const temp = [...prevState]
                temp[index].quantity = result
                temp[index].quantityError = null
                return temp
            })
        })
    }

    const handleOnChangeProductUnit = (index: number) => (value: any) => {
        setProducts(prevState => {
            const temp = [...prevState]
            temp[index].unit = value
            temp[index].unitError = null
            return temp
        })
    }

    const handleOnChangeProductWarehouse = (index: number) => (value: any) => {
        setProducts(prevState => {
            const temp = [...prevState]
            temp[index].warehouse = value
            temp[index].warehouseError = null
            return temp
        })
    }

    const handleOnChangeProductTax = (index: number) => (value) => {
        sanitizeCurrencyInput(value, (result) => {
            setProducts(prevState => {
                const temp = [...prevState]
                temp[index].tax = result
                return temp
            })
        })
    }

    const handleOnChangeProductDiscount = (index: number) => (value) => {
        sanitizeCurrencyInput(value, (result) => {
            console.log(result)
            setProducts(prevState => {
                const temp = [...prevState]
                temp[index].discount = result
                return temp
            })
        })
    }

    const toggleDiscountFormat = (index: number) => () => {

        setProducts(prevState => {
            const temp = [...prevState]

            // set discountFormat to amount/percent (toggle)
            temp[index].discountFormat = temp[index].discountFormat == "AMOUNT" ? "PERCENT" : "AMOUNT"

            // convert discount to amount/percent (toggle) based on discountFormat
            if (temp[index].price != "0") {
                const priceInBigDecimal = new BigDecimal(parseFormattedValue(temp[index].price))
                let discountInBigDecimal = new BigDecimal(parseFormattedValue(temp[index].discount))

                if (temp[index].discountFormat == "AMOUNT") {
                    discountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)

                } else if (temp[index].discountFormat == "PERCENT") {
                    discountInBigDecimal = discountInBigDecimal.multiply(new BigDecimal("100")).divide(priceInBigDecimal, 2)
                }
                temp[index].discount = parseValueToFormatted(discountInBigDecimal.getValue())
            }
            return temp
        })

    }

    const toggleTaxFormat = (index: number) => () => {
        setProducts(prevState => {
            const temp = [...prevState]

            temp[index].taxFormat = temp[index].taxFormat == "AMOUNT" ? "PERCENT" : "AMOUNT"

            console.log("price", typeof temp[index].price)

            if (temp[index].price != "0") {

                console.log("price", temp[index].price)

                const priceInBigDecimal = new BigDecimal(parseFormattedValue(temp[index].price))
                const discountInBigDecimal = new BigDecimal(parseFormattedValue(temp[index].discount))
                let valueOfDiscountInBigDecimal = new BigDecimal("0")


                if (temp[index].discountFormat == "PERCENT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
                } else if (temp[index].discountFormat == "AMOUNT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal
                }

                const priceAfterDiscountInBigDecimal = priceInBigDecimal.subtract(valueOfDiscountInBigDecimal)

                console.log('priceAfterDiscountInBigDecimal', priceAfterDiscountInBigDecimal.getValue())

                let taxInBigDecimal = new BigDecimal(parseFormattedValue(temp[index].tax))
                if (temp[index].taxFormat == "AMOUNT") {
                    taxInBigDecimal = taxInBigDecimal.multiply(priceAfterDiscountInBigDecimal).divide(new BigDecimal("100"), 2)
                } else if (temp[index].taxFormat == "PERCENT") {
                    taxInBigDecimal = taxInBigDecimal.multiply(new BigDecimal("100")).divide(priceAfterDiscountInBigDecimal, 2)
                }

                temp[index].tax = parseValueToFormatted(taxInBigDecimal.getValue())
            }

            return temp
        })
    }

    const handleOnChangeProductPrice = (index: number) => (value) => {
        sanitizeCurrencyInput(value, (result) => {
            setProducts(prevState => {
                const temp = [...prevState]
                temp[index].price = result
                temp[index].priceError = null
                return temp
            })
        })
    }

    const handleDeleteProduct = (index: number) => () => {
        setProducts(prevState => {
            const temp = [...prevState]
            temp.splice(index, 1)
            return temp
        })
    }

    const handleOnChangeShippingFee = (value) => {
        sanitizeCurrencyInput(value, setShippingFee)
    }

    const handleOnChangeOtherFee = (value) => {
        sanitizeCurrencyInput(value, setOtherFee)
    }

    const calculateSubtotal = () => {
        const _products = [...products]
        let total = new BigDecimal("0")
        for (const product of _products) {
            const priceInBigDecimal = new BigDecimal(parseFormattedValue(product.price))
            const quantityInBigDecimal = new BigDecimal(parseFormattedValue(product.quantity))
            const subtotal = quantityInBigDecimal.multiply(priceInBigDecimal)
            total = total.add(subtotal)
        }
        return total
    }

    const calculateGrandTotal = () => {
        let total = new BigDecimal("0")

        for (const product of products) {
            const priceInBigDecimal = new BigDecimal(product.price)
            const quantityInBigDecimal = new BigDecimal(parseFormattedValue(product.quantity))
            const discountInBigDecimal = new BigDecimal(parseFormattedValue(product.discount))
            const taxInBigDecimal = new BigDecimal(parseFormattedValue(product.tax))

            let valueOfDiscountInBigDecimal = new BigDecimal("0")
            let valueOfTaxInBigDecimal = new BigDecimal("0")

            if (product.price != "0") {
                if (product.discountFormat == "AMOUNT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal
                } else if (product.discountFormat == "PERCENT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
                }

                if (product.taxFormat == "AMOUNT") {
                    valueOfTaxInBigDecimal = taxInBigDecimal
                } else if (product.taxFormat == "PERCENT") {
                    valueOfTaxInBigDecimal = taxInBigDecimal.multiply(priceInBigDecimal.subtract(valueOfDiscountInBigDecimal)).divide(new BigDecimal("100"), 2)
                }
            }

            const subtotal = quantityInBigDecimal.multiply(priceInBigDecimal.add(valueOfTaxInBigDecimal).subtract(valueOfDiscountInBigDecimal))

            total = total.add(subtotal)
        }

        const shippingFeeInBigDecimal = new BigDecimal(parseFormattedValue(shippingFee))
        const otherFeeInBigDecimal = new BigDecimal(parseFormattedValue(otherFee))

        total = total.add(shippingFeeInBigDecimal)
        total = total.add(otherFeeInBigDecimal)

        return total
    }

    const calculateSumOfDiscount = () => {
        const _products = [...products]
        let totalDiscount = new BigDecimal("0")
        for (const product of _products) {
            const quantityInBigDecimal = new BigDecimal(parseFormattedValue(product.quantity))
            const discountInBigDecimal = new BigDecimal(parseFormattedValue(product.discount))
            const priceInBigDecimal = new BigDecimal(parseFormattedValue(product.price))

            let valueOfDiscountInBigDecimal = new BigDecimal("0")
            if (product.price != "0") {
                if (product.discountFormat == "AMOUNT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal
                } else if (product.discountFormat == "PERCENT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
                }
            }

            totalDiscount = totalDiscount.add(quantityInBigDecimal.multiply(valueOfDiscountInBigDecimal))
        }
        return totalDiscount
    }

    const calculateSumOfTax = () => {
        const _products = [...products]
        let totalTax = new BigDecimal("0")
        for (const product of _products) {
            const quantityInBigDecimal = new BigDecimal(parseFormattedValue(product.quantity))
            const discountInBigDecimal = new BigDecimal(parseFormattedValue(product.discount))
            const priceInBigDecimal = new BigDecimal(parseFormattedValue(product.price))
            const taxInBigDecimal = new BigDecimal(parseFormattedValue(product.tax))

            let valueOfDiscountInBigDecimal = new BigDecimal("0")
            let valueOfTaxInBigDecimal = new BigDecimal("0")

            if (product.price != "0") {
                if (product.discountFormat == "AMOUNT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal
                } else if (product.discountFormat == "PERCENT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
                }

                const priceAfterDiscountInBigDecimal = priceInBigDecimal.subtract(valueOfDiscountInBigDecimal)

                if (product.taxFormat == "AMOUNT") {
                    valueOfTaxInBigDecimal = taxInBigDecimal
                } else if (product.taxFormat == "PERCENT") {
                    valueOfTaxInBigDecimal = taxInBigDecimal.multiply(priceAfterDiscountInBigDecimal).divide(new BigDecimal("100"), 2)
                }
            }

            totalTax = totalTax.add(quantityInBigDecimal.multiply(valueOfTaxInBigDecimal))
        }
        return totalTax
    }

    const itemSubtotal = (product: ProductPurchaseOrderOptions) => {
        const quantityInBigDecimal = new BigDecimal(parseFormattedValue(product.quantity))
        const priceInBigDecimal = new BigDecimal(parseFormattedValue(product.price))
        const discountInBigDecimal = new BigDecimal(parseFormattedValue(product.discount))
        const taxInBigDecimal = new BigDecimal(parseFormattedValue(product.tax))

        let valueOfDiscountInBigDecimal = new BigDecimal("0")
        let valueOfTaxInBigDecimal = new BigDecimal("0")

        if (product.price != "0") {
            if (product.discountFormat == "AMOUNT") {
                valueOfDiscountInBigDecimal = discountInBigDecimal
            } else if (product.discountFormat == "PERCENT") {
                valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
            }

            const priceAfterDiscountInBigDecimal = priceInBigDecimal.subtract(valueOfDiscountInBigDecimal)

            if (product.taxFormat == "AMOUNT") {
                valueOfTaxInBigDecimal = taxInBigDecimal
            } else if (product.taxFormat == "PERCENT") {
                valueOfTaxInBigDecimal = taxInBigDecimal.multiply(priceAfterDiscountInBigDecimal).divide(new BigDecimal("100"), 2)
            }
        }

        const subtotalInBigDecimal = quantityInBigDecimal.multiply(priceInBigDecimal.subtract(valueOfDiscountInBigDecimal).add(valueOfTaxInBigDecimal))

        return formatValue({
            value: subtotalInBigDecimal.getValue(),
            decimalSeparator: ",",
            groupSeparator: "."
        })
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

    const submitCreatePurchaseOrder = (status: PurchaseOrderStatus = "AWAITING_APPROVAL") => {
        validateForSubmit().then(value => {
            const {isSupplierValid, isPaymentTypeValid, isEntryDateValid, isDueDateValid, isProductsValid} = value
            const valid = isSupplierValid && isPaymentTypeValid && isEntryDateValid && isDueDateValid && isProductsValid
            if (valid) doSubmitCreatePurchaseOrder(status)
            else notifyError("Periksa kembali data masukan Anda")
        })
    }

    const doSubmitCreatePurchaseOrder = (status: PurchaseOrderStatus = "AWAITING_APPROVAL") => {

        setIsLoading(true)

        const createPurchaseOrderRequest: CreatePurchaseOrderRequest = {
            status: status,
            supplierId: supplier.supplier!.value,
            entryDate: formatDateToCommonFormat(entryDate.entryDate!),
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
                    discount: parseFloat(parseFormattedValue(product.discount)),
                    unitId: product.unit?.value!,
                    discountFormat: product.discountFormat,
                    tax: parseFloat(parseFormattedValue(product.tax)),
                    taxFormat: product.taxFormat,
                }
            })
        }

        console.log(createPurchaseOrderRequest)

        purchaseOrderApiService.createPurchaseOrder(createPurchaseOrderRequest)
            .then(response => {
                console.log(response.data)
                notifySuccess("Pesanan Pembelian berhasil dibuat")
                resetForm()
                gotoPurchaseOrderViewPage(response.data.data.id)
            })
            .catch(error => {
                console.log(error)
                notifyError(error?.response?.data?.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const gotoPurchaseOrderViewPage = (purchaseOrderId: string) => {
        history.push("/purchase-orders/view/" + purchaseOrderId)
    }

    const onClickSelectedHistoryPrice = (historyPrice) => {
        console.log(historyPrice)
    }

    const handleSelectHistoryPrice = (product: ProductPurchaseOrderOptions) => {
        console.log(product)
        if (supplier.supplier == null) {
            notifyWarning("Supplier belum dipilih")
            return
        }
        setHistoryPriceParam({
            supplierId: supplier.supplier?.value!,
            productId: product.product.id,
            unitId: product.unit?.value!
        })
        setIsModalHistoryPriceVisible(true)
    }

    const saveAsDraft = () => {
        submitCreatePurchaseOrder("DRAFT")
    }

    const saveAndRequestForApproval = () => {
        submitCreatePurchaseOrder("AWAITING_APPROVAL")
    }

    const saveAndApprove = () => {
        submitCreatePurchaseOrder("APPROVED")
    }

    const resetForm = () => {
        setProducts([])
        setDueDate({dueDate: dateOfDayMonthYear(new Date()), dueDateError: null})
        setEntryDate({entryDate: dateOfDayMonthYear(new Date()), entryDateError: null})
        setSupplier({supplier: null, supplierError: null})
        setPaymentType({paymentType: null, paymentTypeError: null})
        setReference("")
        setNote("")
        setShippingFee("0")
        setShippingFeeDescription("")
        setOtherFee("0")
        setOtherFeeDescription("")
    }

    useEffect(() => {
        Promise.any([
            loadSuppliers(),
            loadWarehouses(),
        ]).then(promises => {
            setIsLoading(false)
        })
    }, [])

    return (
        <Fragment>
            <ModalEditProductPurchaseOrder
                isOpen={isModalEditProductPurchaseOrderVisible}
                toggleModal={() => setIsModalEditProductPurchaseOrderVisible(!isModalEditProductPurchaseOrderVisible)}
                toggleHeader={() => setIsModalEditProductPurchaseOrderVisible(!isModalEditProductPurchaseOrderVisible)}
                productPurchaseOrderToEdit={productPurchaseOrderToEditInModal}
                onApplyChange={(value) => {
                    console.log("productPurchaseOrderToEdit", value)
                    setProducts(prevState => {
                        const temp = [...prevState]
                        temp[value.index] = value.productToEdit
                        return temp
                    })
                    setIsModalEditProductPurchaseOrderVisible(!isModalEditProductPurchaseOrderVisible)
                }}
                setProductPurchaseOrderToEdit={setProductPurchaseOrderToEditInModal}
                warehouses={warehouses}
            />
            <ModalSelectProduct
                isOpen={isModalSelectProductVisible}
                onSelect={onClickSelectedProduct}
                toggleModal={() => setIsModalSelectProductVisible(!isModalSelectProductVisible)}
                toggleHeader={() => setIsModalSelectProductVisible(!isModalSelectProductVisible)}
            />
            <ModalHistoryPrice
                historyPriceParam={historyPriceParam}
                isOpen={isModalHistoryPriceVisible}
                toggleModal={() => setIsModalHistoryPriceVisible(!isModalHistoryPriceVisible)}
                toggleHeader={() => setIsModalHistoryPriceVisible(!isModalHistoryPriceVisible)}
                onClickHistoryPrice={onClickSelectedHistoryPrice}
            />

            <UILoader blocking={isLoading}>
                {/* title card section start */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tambah Pesanan Pembelian</CardTitle>
                    </CardHeader>
                </Card>
                {/* title card section end */}

                {/* form field card section start */}
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Kode</Label>
                                    <Input readOnly defaultValue={"auto"}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
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
                            <Col md={6}>
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
                            {paymentType.paymentType && paymentType.paymentType.value == "CREDIT" &&
                            (<Col md={3}>
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
                            </Col>)
                            }
                        </Row>
                        <Row>
                            <Col md={3}>
                                <Row>
                                    <Col md={12}>
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
                                </Row>
                            </Col>
                            <Col md={3}>
                                <Row>
                                    <Col md={12}>
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
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="reference">Referensi</Label>
                                    <Input value={reference} onChange={(event => setReference(event.target.value))}
                                           placeholder="Referensi"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {/* form field card section end */}

                {/* product card section start */}
                <Card className="pb-2">
                    <CardBody>
                        <Row>
                            <Col className={"d-flex justify-content-end"}>
                                <Button color={"primary"} outline onClick={() => {
                                    setIsModalSelectProductVisible(true)
                                }}><Search size={14} className={"mr-1"}/>Tambah Produk</Button>
                            </Col>
                        </Row>
                    </CardBody>
                    {products.length == 0 && (
                        <p className={classnames("text-center p-2", {"text-danger": productsError})}>Tidak ada
                            produk</p>
                    )}
                    <div className="table-responsive">
                        {products.length > 0 && <table
                            className="table mt-2 table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th className="w-25" scope="col">Nama</th>
                                <th className="w-25" scope="col">Gudang</th>
                                <th className="w-25" scope="col">Unit</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Diskon</th>
                                <th scope="col">Pajak</th>
                                <th className="w-25" scope="col">Harga</th>
                                <th scope="col">Jumlah</th>
                                <th scope="col">Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((product, indexOfProduct, arr) => (
                                <Fragment key={`product-${indexOfProduct}`}>
                                    <tr>
                                        <td>{indexOfProduct + 1}</td>
                                        <td style={{minWidth: 250}}>{product.product.name}</td>
                                        <td style={{minWidth: 250}}>
                                            <Select
                                                styles={{menu: (base) => ({})}}
                                                id="warehouse"
                                                name="warehouse"
                                                className={classnames('react-select', {'is-invalid': product.warehouseError})}
                                                classNamePrefix='select'
                                                isClearable
                                                placeholder="Gudang"
                                                theme={selectThemeColors}
                                                options={warehouses}
                                                value={product.warehouse}
                                                onChange={handleOnChangeProductWarehouse(indexOfProduct)}
                                            />
                                        </td>
                                        <td style={{minWidth: 250}}>
                                            <Select
                                                styles={{menu: (base) => ({})}}
                                                id="unit"
                                                name="unit"
                                                className={classnames('react-select', {'is-invalid': product.unitError})}
                                                classNamePrefix='select'
                                                isClearable
                                                placeholder="Unit"
                                                theme={selectThemeColors}
                                                options={product.units.map(unit => ({
                                                    label: unit.name,
                                                    value: unit.id
                                                }))}
                                                value={product.unit}
                                                onChange={handleOnChangeProductUnit(indexOfProduct)}
                                            />
                                        </td>
                                        <td style={{minWidth: 250}}>
                                            <CurrencyInput
                                                className={classnames("form-control", {"is-invalid": product.quantityError})}
                                                name="quantity"
                                                placeholder="10.000"
                                                defaultValue={1}
                                                decimalsLimit={2}
                                                groupSeparator={"."}
                                                decimalSeparator={","}
                                                value={product.quantity}
                                                onValueChange={handleOnChangeProductQuantity(indexOfProduct)}
                                            />
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <CurrencyInput
                                                    style={{minWidth: 200}}
                                                    className="form-control mr-1"
                                                    name="discount"
                                                    placeholder="10.000"
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    groupSeparator={"."}
                                                    decimalSeparator={","}
                                                    value={product.discount}
                                                    onValueChange={handleOnChangeProductDiscount(indexOfProduct)}
                                                />
                                                <CustomInput
                                                    type='switch'
                                                    id={`discountFormat${indexOfProduct}`}
                                                    name={`discountFormat${indexOfProduct}`}
                                                    label={product.discountFormat == "AMOUNT" ? "Rp" : "(%)"}
                                                    inline
                                                    // value={product.discountFormat}
                                                    onChange={toggleDiscountFormat(indexOfProduct)}
                                                />

                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <CurrencyInput
                                                    style={{minWidth: 200}}
                                                    className="form-control mr-1"
                                                    name="tax"
                                                    placeholder="10.000"
                                                    defaultValue={0}
                                                    decimalsLimit={2}
                                                    groupSeparator={"."}
                                                    decimalSeparator={","}
                                                    value={product.tax}
                                                    onValueChange={handleOnChangeProductTax(indexOfProduct)}
                                                />
                                                <CustomInput
                                                    type='switch'
                                                    id={`taxFormat${indexOfProduct}`}
                                                    name={`taxFormat${indexOfProduct}`}
                                                    label={product.taxFormat == "AMOUNT" ? "Rp" : "(%)"}
                                                    inline
                                                    // value={product.discountFormat}
                                                    onChange={toggleTaxFormat(indexOfProduct)}
                                                />

                                            </div>
                                        </td>
                                        <td style={{minWidth: 280}}>
                                            <Row>
                                                <Col>
                                                    <CurrencyInput
                                                        className={classnames("form-control", {"is-invalid": product.priceError})}
                                                        name="price"
                                                        placeholder="0"
                                                        defaultValue={product.price}
                                                        decimalsLimit={2}
                                                        groupSeparator={"."}
                                                        decimalSeparator={","}
                                                        value={product.price}
                                                        onValueChange={handleOnChangeProductPrice(indexOfProduct)}
                                                    />
                                                </Col>
                                                <Button color="flat-primary"
                                                        className="btn-icon"
                                                        id="historyPriceButton"
                                                        onClick={() => handleSelectHistoryPrice(product)}>
                                                    <RotateCcw size={14}/>
                                                </Button>
                                                <UncontrolledTooltip placement='top' target='historyPriceButton'>
                                                    Histori Harga
                                                </UncontrolledTooltip>
                                            </Row>
                                        </td>
                                        <td style={{minWidth: 280}}>
                                            <Input readOnly
                                                // defaultValue={itemSubtotal(product)}
                                                   value={itemSubtotal(product)}
                                            />
                                        </td>
                                        <td className="text-nowrap">
                                            <TableActionButton
                                                // useDetail={true}
                                                useEdit={true}
                                                useDelete={true}
                                                hasAuthorityToViewDetail={true}
                                                hasAuthorityToEdit={true}
                                                hasAuthorityToDelete={true}
                                                onClickDetail={() => {

                                                }}
                                                onClickEdit={() => {
                                                    console.log(product)
                                                    setProductPurchaseOrderToEditInModal({
                                                        index: indexOfProduct,
                                                        productToEdit: product
                                                    })
                                                    setIsModalEditProductPurchaseOrderVisible(!isModalEditProductPurchaseOrderVisible)
                                                }}
                                                onClickDelete={handleDeleteProduct(indexOfProduct)}
                                            />
                                        </td>
                                    </tr>
                                    {product.warehouseError && (
                                        <tr>
                                            <td colSpan={10} className="text-danger">{product.warehouseError}</td>
                                        </tr>
                                    )}
                                    {product.quantityError && (
                                        <tr>
                                            <td colSpan={10} className="text-danger">{product.quantityError}</td>
                                        </tr>
                                    )}
                                    {product.priceError && (
                                        <tr>
                                            <td colSpan={10} className="text-danger">{product.priceError}</td>
                                        </tr>
                                    )}
                                    {product.unitError && (
                                        <tr>
                                            <td colSpan={10} className="text-danger">{product.unitError}</td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                            </tbody>
                        </table>}
                    </div>
                </Card>
                {/* product card section end */}

                {/* summary card section start */}
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={3}>
                                <FormGroup className="mt-1">
                                    <Label>Catatan</Label>
                                    <Input type="textarea" rows="3" placeholder={"Catatan..."} value={note}
                                           onChange={(event) => setNote(event.target.value)}/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <NominalTitleValue valueSize="lg" title="Diskon"
                                                   value={calculateSumOfDiscount().getValue()}/>
                                <NominalTitleValue valueSize="lg" title="Pajak" value={calculateSumOfTax().getValue()}/>
                                <NominalTitleValue valueSize="lg" title="Biaya Pengiriman"
                                                   value={parseFormattedValue(shippingFee)}/>
                                <NominalTitleValue valueSize="lg" title="Biaya Lain-lain"
                                                   value={parseFormattedValue(otherFee)}/>
                                <NominalTitleValue valueSize="lg" title="Total" value={calculateSubtotal().getValue()}/>
                                <NominalTitleValue valueSize="lg" title="Grand Total"
                                                   value={calculateGrandTotal().getValue()}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="d-flex justify-content-end mt-2">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color='primary' caret>Simpan</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            className="w-100"
                                            onClick={saveAsDraft}>Simpan sebagai Draft</DropdownItem>
                                        <DropdownItem
                                            className="w-100"
                                            onClick={saveAndApprove}>Simpan & Setujui</DropdownItem>
                                        <DropdownItem
                                            className="w-100"
                                            onClick={saveAndRequestForApproval}>Simpan & Ajukan
                                            Persetujuan</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {/* summary card section end */}
            </UILoader>
        </Fragment>
    )
}

export default PurchaseOrderAddPage