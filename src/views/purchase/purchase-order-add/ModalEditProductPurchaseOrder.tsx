// @ts-ignore
import {selectThemeColors} from '@utils'
import {
    Button,
    Col,
    CustomInput,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import {
    ProductPurchaseOrderToEditInModal
} from "./PurchaseOrderAddPage";
import classnames from "classnames";
import Select from "react-select";
import CurrencyInput, {formatValue} from "react-currency-input-field";
import {Dispatch, SetStateAction} from "react";
import {sanitizeCurrencyInput} from "../../../utility/currency-input-util";
import BigDecimal from "js-big-decimal";
import {parseFormattedValue, parseValueToFormatted} from "../../../utility/parse-formatted-value";
import {SelectOptions} from "../../../models/SelectOptions";

interface ModalEditProductPurchaseOrderProps {
    isOpen: boolean
    toggleModal: () => void
    toggleHeader: () => void
    warehouses: SelectOptions[]
    productPurchaseOrderToEdit: ProductPurchaseOrderToEditInModal
    setProductPurchaseOrderToEdit: Dispatch<SetStateAction<ProductPurchaseOrderToEditInModal>>
    onApplyChange: (productPurchaseOrderToEdit: ProductPurchaseOrderToEditInModal) => void
}


const ModalEditProductPurchaseOrder = (props: ModalEditProductPurchaseOrderProps) => {

    const {
        isOpen, toggleModal, toggleHeader, productPurchaseOrderToEdit, onApplyChange,
        setProductPurchaseOrderToEdit, warehouses
    } = props

    const applyChange = () => {
        onApplyChange(productPurchaseOrderToEdit)
    }

    const handleOnChangeProductUnit = (value: any) => {
        setProductPurchaseOrderToEdit(prevState => {
            return {
                ...prevState,
                productToEdit: {
                    ...prevState.productToEdit,
                    unit: value,
                    unitError: null
                }
            }
        })
    }

    const handleOnChangeProductWarehouse = (value: any) => {
        setProductPurchaseOrderToEdit(prevState => {
            return {
                ...prevState,
                productToEdit: {
                    ...prevState.productToEdit,
                    warehouse: value,
                    warehouseError: null
                }
            }
        })
    }

    const handleOnChangeProductQuantity = (value: any) => {
        sanitizeCurrencyInput(value, (result) => {
            setProductPurchaseOrderToEdit(prevState => {
                return {
                    ...prevState,
                    productToEdit: {
                        ...prevState.productToEdit,
                        quantity: result,
                        quantityError: null
                    }
                }
            })
        })
    }

    const handleOnChangeProductTax = (value) => {
        sanitizeCurrencyInput(value, (result) => {
            setProductPurchaseOrderToEdit(prevState => {
                return {
                    ...prevState,
                    productToEdit: {
                        ...prevState.productToEdit,
                        tax: result,
                    }
                }
            })
        })
    }

    const handleOnChangeProductDiscount = (value) => {
        const MAX_VALUE = 100
        sanitizeCurrencyInput(value, (result) => {
            setProductPurchaseOrderToEdit(prevState => {
                let discount = prevState.productToEdit.discount
                if (parseFloat(parseFormattedValue(result)) <= MAX_VALUE) {
                    discount = result
                }

                return {
                    ...prevState,
                    productToEdit: {
                        ...prevState.productToEdit,
                        discount: discount,
                    }
                }
            })
        })
    }

    const handleOnChangeProductPrice = (value) => {
        sanitizeCurrencyInput(value, (result) => {
            setProductPurchaseOrderToEdit(prevState => {
                return {
                    ...prevState,
                    productToEdit: {
                        ...prevState.productToEdit,
                        price: result,
                        priceError: null
                    }
                }
            })
        })
    }

    const itemSubtotal = () => {
        const product = productPurchaseOrderToEdit.productToEdit
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

    const toggleDiscountFormat = () => {
        setProductPurchaseOrderToEdit(prevState => {
            const temp = {...prevState}

            temp.productToEdit.discountFormat = temp.productToEdit.discountFormat == "AMOUNT" ? "PERCENT" : "AMOUNT"

            if (temp.productToEdit.price != "0") {
                const priceInBigDecimal = new BigDecimal(parseFormattedValue(temp.productToEdit.price))
                const discountInBigDecimal = new BigDecimal(parseFormattedValue(temp.productToEdit.discount))

                let valueOfDiscountInBigDecimal = new BigDecimal("0")
                if (temp.productToEdit.discountFormat == "AMOUNT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
                } else if (temp.productToEdit.discountFormat == "PERCENT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(new BigDecimal("100")).divide(priceInBigDecimal, 2)
                }

                temp.productToEdit.discount = parseValueToFormatted(valueOfDiscountInBigDecimal.getValue())
            }

            return temp
        })
    }

    const toggleTaxFormat = () => {
        setProductPurchaseOrderToEdit(prevState => {
            const temp = {...prevState}

            temp.productToEdit.taxFormat = temp.productToEdit.taxFormat == "AMOUNT" ? "PERCENT" : "AMOUNT"

            if (temp.productToEdit.price != "0") {
                const priceInBigDecimal = new BigDecimal(parseFormattedValue(productPurchaseOrderToEdit.productToEdit.price))
                const taxInBigDecimal = new BigDecimal(parseFormattedValue(productPurchaseOrderToEdit.productToEdit.tax))
                const discountInBigDecimal = new BigDecimal(parseFormattedValue(productPurchaseOrderToEdit.productToEdit.discount))

                let valueOfDiscountInBigDecimal = new BigDecimal("0")
                if (temp.productToEdit.discountFormat == "AMOUNT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal
                } else if (temp.productToEdit.discountFormat == "PERCENT") {
                    valueOfDiscountInBigDecimal = discountInBigDecimal.multiply(priceInBigDecimal).divide(new BigDecimal("100"), 2)
                }

                const priceAfterDiscountInBigDecimal = priceInBigDecimal.subtract(valueOfDiscountInBigDecimal)

                console.log("price", priceAfterDiscountInBigDecimal.getValue())

                let valueOfTaxInBigDecimal = new BigDecimal("0")
                if (temp.productToEdit.taxFormat == "AMOUNT") {
                    valueOfTaxInBigDecimal = taxInBigDecimal.multiply(priceAfterDiscountInBigDecimal).divide(new BigDecimal("100"), 2)
                } else if (temp.productToEdit.taxFormat == "PERCENT") {
                    valueOfTaxInBigDecimal = taxInBigDecimal.multiply(new BigDecimal("100")).divide(priceAfterDiscountInBigDecimal, 2)
                }

                temp.productToEdit.tax = parseValueToFormatted(valueOfTaxInBigDecimal.getValue())
            }

            return temp
        })
    }

    return (
        <Modal
            autoFocus={false}
            className="modal-dialog-centered modal-lg"
            scrollable
            isOpen={isOpen}
            toggle={toggleModal}
        >
            <ModalHeader toggle={toggleHeader}>Edit Produk Pesanan Pembelian</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Nama Produk</Label>
                    <Input readOnly defaultValue={productPurchaseOrderToEdit.productToEdit.product.name}/>
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Gudang</Label>
                            <Select
                                id="warehouse"
                                name="warehouse"
                                className={classnames('react-select', {'is-invalid': productPurchaseOrderToEdit.productToEdit.warehouseError})}
                                classNamePrefix='select'
                                isClearable
                                placeholder="Gudang"
                                theme={selectThemeColors}
                                options={warehouses}
                                value={productPurchaseOrderToEdit.productToEdit.warehouse}
                                onChange={handleOnChangeProductWarehouse}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Unit</Label>
                            <Select
                                id="unit"
                                name="unit"
                                className={classnames('react-select', {'is-invalid': productPurchaseOrderToEdit.productToEdit.unitError})}
                                classNamePrefix='select'
                                isClearable
                                placeholder="Unit"
                                theme={selectThemeColors}
                                options={productPurchaseOrderToEdit
                                    .productToEdit
                                    .product.units.map(unit => ({
                                        label: unit.name,
                                        value: unit.id
                                    }))}
                                value={productPurchaseOrderToEdit.productToEdit.unit}
                                onChange={handleOnChangeProductUnit}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Quantity</Label>
                            <CurrencyInput
                                className={classnames("form-control", {"is-invalid": productPurchaseOrderToEdit.productToEdit.quantityError})}
                                name="quantity"
                                placeholder="10.000"
                                defaultValue={1}
                                decimalsLimit={2}
                                groupSeparator={"."}
                                decimalSeparator={","}
                                value={productPurchaseOrderToEdit.productToEdit.quantity}
                                onValueChange={handleOnChangeProductQuantity}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Harga</Label>
                            <CurrencyInput
                                className={classnames("form-control", {"is-invalid": productPurchaseOrderToEdit.productToEdit.priceError})}
                                name="price"
                                placeholder="10.000"
                                defaultValue={1}
                                decimalsLimit={2}
                                groupSeparator={"."}
                                decimalSeparator={","}
                                value={productPurchaseOrderToEdit.productToEdit.price}
                                onValueChange={handleOnChangeProductPrice}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Diskon</Label>
                            <CurrencyInput
                                className="form-control"
                                name="discount"
                                placeholder="10.000"
                                defaultValue={0}
                                decimalsLimit={2}
                                groupSeparator={"."}
                                decimalSeparator={","}
                                value={productPurchaseOrderToEdit.productToEdit.discount}
                                onValueChange={handleOnChangeProductDiscount}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <CustomInput
                            type='switch'
                            id={`discountFormatInModal`}
                            name={`discountFormatInModal`}
                            label={productPurchaseOrderToEdit.productToEdit.discountFormat == "AMOUNT" ? "Rp" : "(%)"}
                            inline
                            onChange={toggleDiscountFormat}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Pajak</Label>
                            <CurrencyInput
                                className="form-control"
                                name="tax"
                                placeholder="10.000"
                                defaultValue={0}
                                decimalsLimit={2}
                                groupSeparator={"."}
                                decimalSeparator={","}
                                value={productPurchaseOrderToEdit.productToEdit.tax}
                                onValueChange={handleOnChangeProductTax}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <CustomInput
                            type='switch'
                            id={`taxFormatInModal`}
                            name={`taxFormatInModal`}
                            label={productPurchaseOrderToEdit.productToEdit.taxFormat == "AMOUNT" ? "Rp" : "(%)"}
                            inline
                            onChange={toggleTaxFormat}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Jumlah</Label>
                            <Input value={itemSubtotal()} readOnly/>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={applyChange}>Simpan</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalEditProductPurchaseOrder