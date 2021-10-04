import {Fragment, useEffect, useRef} from "react";
// @ts-ignore
import {selectThemeColors} from '@utils'
import {
    Button,
    Col,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    ModalBody,
    ModalFooter,
    Row
} from "reactstrap";
import Select from "react-select";
import {Plus, X} from "react-feather";
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
// @ts-ignore
import Repeater from '@components/repeater'
import {Unit} from "../../../models/Unit";
import classnames from "classnames";
import {CreateProductRequest} from "../../../models/requests/CreateProductRequest";
import {productApiService} from "../../../apiservice/product";
import {notifySuccess} from "../../component/SuccessToast";
import CurrencyInput from "react-currency-input-field";
import {categoryApiService} from "../../../apiservice/category";
import {brandApiService} from "../../../apiservice/brand";
import {unitApiService} from "../../../apiservice/unit";
import {Category} from "../../../models/Category";
import {Page} from "../../../models/Page";
import {ApiResponse} from "../../../models/responses/ApiResponse";
import {AxiosResponse} from "axios";
import {Brand} from "../../../models/Brand";
import {notifyError} from "../../component/ErrorToast";
import {ProductUnitConversionRequest} from "../../../models/requests/ProductUnitConversionRequest";
import {SelectOptions} from "../../../models/SelectOptions";


// const brandOptions = [
//     {value: "1", label: "Pilot"},
//     {value: "2", label: "Standard"},
//     {value: "3", label: "Joyko"},
//     {value: "4", label: "Kenko"},
// ]
//
// const categoryOptions = [
//     {value: "1", label: "Bahan percetakan"},
//     {value: "2", label: "ATK"},
//     {value: "3", label: "Makanan"},
//     {value: "4", label: "Minuman"},
// ]
//
// const unitOptions = [
//     {value: "1", label: "Dus"},
//     {value: "2", label: "Box"},
//     {value: "3", label: "Pcs"},
//     {value: "4", label: "Meter"},
//     {value: "5", label: "Roll"},
//     {value: "6", label: "Buah"},
// ]
//



interface UnitSelect {
    multiplier: string
    multiplierError: null | string,
    unit: SelectOptions | null
    unitError: null | string,
}

interface ProductForm {
    name: string
    nameError: null | string
    code: string
    category: null | SelectOptions
    categoryError: null | string
    brand: null | SelectOptions
    brandError: null | string
}

const initialProduct: ProductForm = {
    name: "",
    nameError: null,
    code: "",
    category: null,
    categoryError: null,
    brand: null,
    brandError: null
}

const initialUnit: UnitSelect = {
    multiplier: "1",
    multiplierError: null,
    unit: null,
    unitError: null,
}

const MAX_UNIT_COUNT = 2

const idempotentKey: string = uuidv4()


interface ProductGeneralInformationProps {
    onSuccess: () => void
}

const ProductGeneralInformation = ({onSuccess}: ProductGeneralInformationProps) => {


    // ** state
    const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([])

    const [categoryOptions, setCategoryOptions] = useState<SelectOptions[]>([])

    const [brandOptions, setBrandOptions] = useState<SelectOptions[]>([])

    const [product, setProduct] = useState<ProductForm>({
        name: "",
        nameError: null,
        code: "",
        category: null,
        categoryError: null,
        brand: null,
        brandError: null
    })

    const [unit, setUnit] = useState<UnitSelect>({
        multiplier: "1",
        multiplierError: null,
        unit: null,
        unitError: null,
    })

    const [units, setUnits] = useState<UnitSelect[]>([])

    // ** methods
    const loadOptions = () => {
        Promise.allSettled([
            categoryApiService.getCategories({}),
            brandApiService.getBrands({}),
            unitApiService.getUnits({})
        ]).then(promises => {
            handlePromiseOfCategory(promises[0])
            handlePromiseOfBrand(promises[1])
            handlePromiseOfUnit(promises[2])
        })
    }

    const handlePromiseOfCategory = (promise: PromiseSettledResult<AxiosResponse<ApiResponse<Page<Category>, any>>>) => {
        if (promise.status == "fulfilled") {
            setCategoryOptions(promise.value.data.data.content.map(item => {
                return {
                    value: item.id.toString(),
                    label: item.name
                }
            }))
        } else {
            console.log('category promise rejected', promise.reason)
        }
    }

    const handlePromiseOfBrand = (promise: PromiseSettledResult<AxiosResponse<ApiResponse<Page<Brand>, any>>>) => {
        if (promise.status == "fulfilled") {
            setBrandOptions(promise.value.data.data.content.map(item => {
                return {
                    value: item.id.toString(),
                    label: item.name
                }
            }))
        } else {
            console.log('brand promise rejected', promise.reason)
        }
    }

    const handlePromiseOfUnit = (promise: PromiseSettledResult<AxiosResponse<ApiResponse<Page<Unit>, any>>>) => {
        if (promise.status == "fulfilled") {
            setUnitOptions(promise.value.data.data.content.map(item => {
                return {
                    value: item.id.toString(),
                    label: item.name
                }
            }))
        } else {
            console.log('unit promise rejected', promise.reason)
        }
    }

    useEffect(() => {
        loadOptions()
    }, [])


    // **
    const handleInputProductName = (event) => {
        setProduct(val => ({...val, name: event.target.value}))
    }

    const handleInputProductCode = (event) => {
        setProduct(val => ({...val, code: event.target.value}))
    }

    const handleSelectProductCategory = (value) => {
        setProduct(val => ({...val, category: value}))
    }

    const handleSelectProductBrand = (value) => {
        setProduct(val => ({...val, brand: value}))
    }

    const addSubUnit = () => {
        if (units.length < 2) {
            const newUnit: UnitSelect = {
                multiplier: "1",
                multiplierError: null,
                unit: null,
                unitError: null
            }
            const tempUnits = [...units, newUnit]
            setUnits(tempUnits)
        }
    }

    const handleSelectUnit = (value) => {
        setUnit({...unit, unit: value, unitError: null})
    }

    const removeSubUnit = (index: number) => () => {
        const tempUnits = [...units]
        tempUnits.splice(index, 1)
        setUnits(tempUnits)
    }

    const handleOnChangeSubUnitMultiplier = (index: number) => (event) => {
        // const val = event.target.value
        const val = event
        const tempUnits = [...units]
        tempUnits[index].multiplier = val
        tempUnits[index].multiplierError = null
        setUnits(tempUnits)
    }

    const handleSelectSubUnit = (index: number) => (value) => {
        const tempUnits = [...units]
        tempUnits[index].unit = value
        tempUnits[index].unitError = null
        setUnits(tempUnits)
    }

    // ** validating value with error message
    const validateUnit = () => {
        return new Promise<UnitSelect>(resolve => {
            setUnit((prevState) => {
                const state = ({
                    ...prevState,
                    unitError: !prevState.unit ? "Satuan belum dipilih" : null,
                    multiplierError: !prevState.multiplier ? "Multiplier belum diisi" : null,
                })
                resolve(state)
                return state
            })
        })
    }

    const unitsUnitValidation = (item: UnitSelect, index: number, arr: UnitSelect[]): string | null => {
        const UNIT_NOT_SELECTED_ERROR = "Satuan belum dipilih!"
        const UNIT_ALREADY_EXIST_ERROR = "Satuan tidak boleh sama dengan satuan di atasnya"
        if (item.unit == null) return UNIT_NOT_SELECTED_ERROR
        if (index === 0) {
            if (item.unit.value === unit.unit?.value) return UNIT_ALREADY_EXIST_ERROR
        } else {
            const filtered = arr.slice(0, index).filter(a => a.unit?.value == item.unit?.value)
            if (filtered.length > 0 || item.unit.value === unit.unit?.value) return UNIT_ALREADY_EXIST_ERROR
        }
        return null
    }

    const unitsMultiplierValidation = (item: UnitSelect, index: number, arr: UnitSelect[]): string | null => {
        const MULTIPLIER_REQUIRED_ERROR = "Multiplier belum diisi"
        if (item.multiplier == undefined || item.multiplier == "" || item.multiplier == "0") return MULTIPLIER_REQUIRED_ERROR
        return null
    }

    const validateUnits = () => {
        return new Promise<UnitSelect[]>(resolve => {
            setUnits(prevState => {
                const state = prevState.map((item, index, arr) => ({
                    ...item,
                    unitError: unitsUnitValidation(item, index, arr),
                    multiplierError: unitsMultiplierValidation(item, index, arr)
                }))
                resolve(state)
                return state
            })
        })
    }

    const validateProduct = () => {
        return new Promise<ProductForm>(resolve => {
            setProduct(prevState => {
                const state = ({
                    ...prevState,
                    nameError: !prevState.name ? "Nama belum diisi" : null,
                    categoryError: !prevState.category ? "Kategori belum dipilih" : null,
                    brandError: !prevState.brand ? "Merk belum dipilih" : null,
                })
                resolve(state)
                return state
            })
        })
    }

    // ** get boolean value of validity
    const unitValid = (unit: UnitSelect) => {
        return unit.unitError == null
    }

    const unitsValid = (units: UnitSelect[]) => {
        if (units.length > 0) {
            const filtered = units.filter(u => u.unitError == null && u.multiplierError == null)
            return filtered.length == units.length;
        }
        return true
    }

    const productValid = (product: ProductForm) => {
        return product.nameError == null && product.categoryError == null && product.brandError == null
    }

    // **
    const constructUnitConversion = () => {

        /**
         * unit conversion
         * * if only 1 unit, then no unit conversion
         * * if there are 2 units, then there is 1 unit conversion
         * * if there are 3 units, then there are 2 unit conversions
         */

        const unitConversions: ProductUnitConversionRequest[] = []

        units.forEach((item, index, arr) => {
            if (index === 0) {
                const unitConversion: ProductUnitConversionRequest = {
                    fromUnitId: unit.unit!.value,
                    multiplier: +arr[0].multiplier,
                    toUnitId: arr[0].unit!.value
                }
                unitConversions.push(unitConversion)
            } else {
                const unitConversion: ProductUnitConversionRequest = {
                    fromUnitId: arr[0].unit!.value,
                    multiplier: +arr[1].multiplier,
                    toUnitId: arr[1].unit!.value
                }
                unitConversions.push(unitConversion)
            }
        })

        return unitConversions
    }

    const resetProduct = () => {
        setProduct(initialProduct)
    }

    const resetUnit = () => {
        setUnit(initialUnit)
    }

    const resetUnits = () => {
        setUnits(prevState => prevState.map(() => ({
                multiplier: "1",
                multiplierError: null,
                unit: null,
                unitError: null,
                price: "",
                priceError: null,
                active: false
            }))
        )
    }

    const resetForm = () => {
        resetProduct()
        resetUnit()
        resetUnits()
    }

    const createProduct = async () => {

        const validatedUnit = await validateUnit()
        const validatedUnits = await validateUnits()
        const validatedProduct = await validateProduct()

        const isUnitValid = unitValid(validatedUnit)
        const isUnitsValid = unitsValid(validatedUnits)
        const isProductValid = productValid(validatedProduct)

        if (isUnitValid && isUnitsValid && isProductValid) {

            const unitIds = [unit, ...units].map(item => item.unit!.value)
            const unitConversions = constructUnitConversion()

            const createProductRequest: CreateProductRequest = {
                name: product.name,
                code: product.code,
                categoryId: product.category!.value,
                brandId: product.brand!.value,
                unitIds: unitIds,
                unitConversions: unitConversions,
                idempotentKey: idempotentKey
            }

            console.log("createProductRequest", createProductRequest)

            try {
                const response = await productApiService.createProduct(createProductRequest)
                console.log('create setting-product response', response.data)
                notifySuccess("Produk tersimpan")
                onSuccess()
            } catch (error) {
                notifyError(error?.response?.data?.message)
            }

        } else {
            if (isUnitValid) {
            }
            if (isUnitsValid) {
            }
            if (isProductValid) {
            }
        }

    }

    return (
        <Fragment>
            <ModalBody>
                <h2>Produk</h2>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Nama <span className="text-danger">*</span></Label>
                            <Input
                                autoFocus={true}
                                className={classnames('react-select', {'is-invalid': product.nameError})}
                                value={product.name}
                                onChange={handleInputProductName}
                            />
                            {product.nameError && <FormFeedback>{product.nameError}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Kode/SKU</Label>
                            <Input value={product.code} onChange={handleInputProductCode}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="category">Kategori <span className="text-danger">*</span></Label>
                            <Select
                                isClearable
                                className={classnames('react-select', {'is-invalid': product.categoryError})}
                                placeholder="Pilih Kategori"
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                name="category"
                                options={categoryOptions}
                                value={product.category}
                                onChange={handleSelectProductCategory}
                            />
                            {product.categoryError && <FormFeedback>{product.categoryError}</FormFeedback>}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="brand">Merk <span className="text-danger">*</span></Label>
                            <Select
                                isClearable
                                className={classnames('react-select', {'is-invalid': product.brandError})}
                                placeholder="Pilih Merk"
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                name="brand"
                                options={brandOptions}
                                value={product.brand}
                                onChange={handleSelectProductBrand}
                            />
                            {product.brandError && <FormFeedback>{product.brandError}</FormFeedback>}
                        </FormGroup>
                    </Col>
                </Row>

                <hr/>

                <h2 className="mb-1">Satuan</h2>
                <Row>
                    {/*<Col md={4}>*/}
                    {/*    <FormGroup>*/}
                    {/*        <Label>Multiplier</Label>*/}
                    {/*        <Input disabled value={1}/>*/}
                    {/*    </FormGroup>*/}
                    {/*</Col>*/}
                    <Col>
                        <FormGroup>
                            <Label>Satuan 1</Label>
                            <Select
                                className={classnames('react-select', {'is-invalid': unit.unitError})}
                                placeholder="Pilih satuan"
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                name="unit"
                                options={unitOptions}
                                value={unit.unit}
                                onChange={handleSelectUnit}
                            />
                            {unit.unitError && <FormFeedback>{unit.unitError}</FormFeedback>}
                        </FormGroup>
                    </Col>
                    {/*<FormGroup>*/}
                    {/*    <Button outline className="mr-1 mt-2" color="primary" onClick={addSubUnit}>*/}
                    {/*        <Plus size={14}/>*/}
                    {/*    </Button>*/}
                    {/*</FormGroup>*/}
                </Row>

                {units.map((item, index) => (
                    <Row key={index}>
                        <Col md={4}>
                            <FormGroup>
                                <Label>Multiplier</Label>
                                <CurrencyInput
                                    className={classnames('form-control', {'is-invalid': item.multiplierError})}
                                    // className="form-control"
                                    name="price"
                                    placeholder="10"
                                    defaultValue={1000}
                                    decimalsLimit={2}
                                    groupSeparator={"."}
                                    decimalSeparator={","}
                                    value={item.multiplier}
                                    onValueChange={handleOnChangeSubUnitMultiplier(index)}
                                />
                                {/*<Input*/}
                                {/*    id={`multiplierUnit${index}`}*/}
                                {/*    name={`multiplierUnit${index}`}*/}
                                {/*    onChange={handleOnChangeSubUnitMultiplier(index)}*/}
                                {/*    value={item.multiplier}*/}
                                {/*    placeholder="1"*/}
                                {/*    type="number"*/}
                                {/*    className={classnames({'is-invalid': item.multiplierError})}*/}
                                {/*/>*/}
                                {item.multiplierError && <FormFeedback>{item.multiplierError}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Satuan {index + 2}</Label>
                                <Select
                                    isClearable
                                    className={classnames('react-select', {'is-invalid': item.unitError})}
                                    placeholder="Pilih satuan"
                                    classNamePrefix='select'
                                    theme={selectThemeColors}
                                    name={`unit${index}`}
                                    options={unitOptions}
                                    value={item.unit}
                                    onChange={handleSelectSubUnit(index)}
                                />
                                {item.unitError && <FormFeedback>{item.unitError}</FormFeedback>}
                            </FormGroup>
                        </Col>
                        <FormGroup>
                            <Button color="danger" outline className="mr-1 mt-2" onClick={removeSubUnit(index)}>
                                <X size={14}/>
                            </Button>
                        </FormGroup>
                    </Row>
                ))}

                {units.length === 2 && <p className="text-warning">Maksimal 3 satuan</p>}

                <Button color="primary" onClick={addSubUnit} outline>Tambah satuan</Button>

                <hr/>
            </ModalBody>


            <ModalFooter>
                <FormGroup className="d-flex justify-content-end">
                    <Button color="primary" className="mr-1" onClick={createProduct}>Simpan</Button>
                    <Button color="primary" outline onClick={resetForm}>Reset</Button>
                </FormGroup>
            </ModalFooter>

        </Fragment>
    )
}


export default ProductGeneralInformation