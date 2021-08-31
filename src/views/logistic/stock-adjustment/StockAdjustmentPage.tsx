// @ts-ignore
import {selectThemeColors} from '@utils'
import {Fragment, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, CustomInput,
    Form,
    FormGroup,
    Input,
    Label,
    Modal, ModalBody,
    ModalHeader,
    Row
} from "reactstrap";
import Select from "react-select";
import Flatpickr from 'react-flatpickr'
import {Indonesian} from 'flatpickr/dist/l10n/id'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import {initialPage} from "../../../redux/reducers/constant";
import {productApiService} from "../../../apiservice/product";
import {Page} from "../../../models/Page";
import {Product} from "../../../models/Product";
import classnames from "classnames";
import DataTable, {IDataTableColumn} from 'react-data-table-component'
import {Unit} from "../../../models/Unit";
import {notifySuccess} from "../../component/SuccessToast";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/states/root";
import {ChevronDown, Trash, Trash2, X} from "react-feather";
import {notifyWarning} from "../../component/WarningToast";

import {Warehouse} from "../../../models/Warehouse";
import {warehouseApiService} from "../../../apiservice/warehouse";
import CurrencyInput from "react-currency-input-field";
import TablePagination from "../../component/TablePagination";
import ModalSelectProduct from "../../component/modal-select-product/ModalSelectProduct";

interface Options {
    label: string
    value: string
}

interface UnitProductAdjustment {

}

interface ProductAdjustment extends Product {

}

const StockAdjustmentPage = () => {

    const [picker, setPicker] = useState(new Date())

    const [isModalSelectProductVisible, setIsModalSelectProductVisible] = useState(false)

    const [products, setProducts] = useState<Product[]>([])

    const [warehouses, setWarehouses] = useState<Warehouse[]>([])

    //

    const loadWarehouses = () => {
        warehouseApiService.getListWarehouse()
            .then(response => setWarehouses(response.data.data))
            .catch(error => console.log(error?.response?.data))
    }

    useEffect(() => {
        loadWarehouses()
    }, [])

    const warehousesToOptions = () => {
        return warehouses.map(warehouse => ({
            label: warehouse.name,
            value: warehouse.id,
        }))
    }

    const addSelectedProduct = (product: Product) => {

        console.log(product)

        setProducts(prevState => {
            if (prevState.filter(item => item.id == product.id).length == 0) {
                notifySuccess("Produk ditambahkan")


                setIsModalSelectProductVisible(false)


                return [...prevState, product]
            }

            notifyWarning("Produk sudah ada")
            return prevState
        })


    }

    const handleRemoveProductItem = (product: Product, indexOfProduct: number) => {
        setProducts(prevState => {
            const temp = [...prevState]
            temp.splice(indexOfProduct, 1)
            return temp
        })

        console.log("delete", product)
    }

    return (
        <Fragment>
            <ModalSelectProduct
                isOpen={isModalSelectProductVisible}
                toggleModal={() => setIsModalSelectProductVisible(!isModalSelectProductVisible)}
                toggleHeader={() => setIsModalSelectProductVisible(!isModalSelectProductVisible)}
                onSelect={addSelectedProduct}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Penyesuaian Stok</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="hf-picker">Tanggal</Label>
                                <Flatpickr
                                    value={picker}
                                    id='hf-picker'
                                    className='form-control'
                                    onChange={date => setPicker(date)}
                                    options={{
                                        locale: Indonesian,
                                        altInput: true,
                                        altFormat: 'j F Y',
                                        dateFormat: 'Y-m-d',
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="adjustment-type">Tipe Penyesuaian</Label>
                                <Select
                                    id="adjustment-type"
                                    name="adjustment-type"
                                    className={classnames('react-select')}
                                    classNamePrefix='select'
                                    isClearable
                                    placeholder="Pilih Tipe Penyesuaian"
                                    theme={selectThemeColors}
                                    options={[
                                        {label: "Masuk", value: "ADJUSTMENT_IN"},
                                        {label: "Keluar", value: "ADJUSTMENT_OUT"},
                                    ]}/>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="warehouse">Gudang</Label>
                                <Select id="warehouse" name="warehouse"
                                        isClearable
                                        className={classnames('react-select')}
                                        placeholder="Pilih Gudang"
                                        classNamePrefix='select'
                                        theme={selectThemeColors}
                                        options={warehousesToOptions()}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="description">Deskripsi</Label>
                                <Input id="description" name="description" type="textarea" rows={3}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <Button
                                color="primary"
                                outline
                                onClick={() => setIsModalSelectProductVisible(true)}
                            >Pilih Produk</Button>
                        </Col>
                    </Row>
                    {products.length == 0 && (
                        <Row className="p-1">
                            <Col className="border rounded p-1 d-flex justify-content-center">
                                <h3>Belum ada produk</h3>
                            </Col>
                        </Row>
                    )}

                    {products.map((product, indexOfProduct) => (
                        <Card key={indexOfProduct} className="rounded border p-1 mt-1">
                            <Row>
                                <Col md={2}>
                                    <p>Nama</p>
                                    <p>Kode/SKU</p>
                                </Col>
                                <Col>
                                    <p className="darken-2 font-weight-bold">{product.name}</p>
                                    <p className="font-weight-bold">{product.code}</p>
                                </Col>
                                <div className="mr-1">
                                    <Button
                                        color="primary"
                                        outline
                                        onClick={() => handleRemoveProductItem(product, indexOfProduct)}>
                                        <Trash size={14}/>
                                    </Button>
                                </div>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    {product.unitConversions.map((unitConversion, indexOfUnitConversion) => (
                                        <Fragment key={`${indexOfProduct}-${indexOfUnitConversion}`}>
                                            <Row>
                                                <FormGroup
                                                    className="justify-content-center d-flex align-items-end ml-1"
                                                    style={{
                                                        width: 40
                                                    }}>
                                                    <p>1</p>
                                                </FormGroup>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Satuan</Label>
                                                        <Input readOnly defaultValue={unitConversion.fromUnit.name}/>
                                                    </FormGroup>
                                                </Col>
                                                <FormGroup className="justify-content-center d-flex align-items-end"
                                                           style={{
                                                               width: 40
                                                           }}>
                                                    <p>{unitConversion.multiplier}</p>
                                                </FormGroup>
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Satuan</Label>
                                                        <Input readOnly defaultValue={unitConversion.toUnit.name}/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    ))}
                                </Col>
                            </Row>

                            <hr/>
                            <Row>
                                <Col md={6}>
                                    {product.units.map((unit, indexOfUnit) => (
                                        <Fragment key={`${indexOfProduct}-${indexOfUnit}`}>
                                            <Row>
                                                {/*<div className="ml-1 mt-2">*/}
                                                {/*    <CustomInput*/}
                                                {/*        type="checkbox"*/}
                                                {/*        id={`unit-${indexOfProduct}-${indexOfUnit}`}/>*/}

                                                {/*</div>*/}
                                                <Col>
                                                    <FormGroup>
                                                        <Label>Nama satuan</Label>
                                                        <Input readOnly defaultValue={unit.name}/>
                                                    </FormGroup>

                                                </Col>

                                                <Col>
                                                    <FormGroup>
                                                        <Label>Quantity</Label>
                                                        {/*<Input bsSize='sm'/>*/}

                                                        <CurrencyInput
                                                            className="form-control"
                                                            name="price"
                                                            placeholder="10.000"
                                                            defaultValue={1000}
                                                            decimalsLimit={2}
                                                            groupSeparator={"."}
                                                            decimalSeparator={","}
                                                            // value={unitPriceValue(unit)}
                                                            // onValueChange={handleOnChangeUnitPrice(index)}
                                                        />
                                                    </FormGroup>

                                                </Col>
                                            </Row>
                                        </Fragment>
                                    ))}
                                </Col>
                            </Row>
                        </Card>
                    ))}

                    <Row className="px-1 justify-content-end">
                        <Button color="primary" size="lg" onClick={() => {
                            console.log(products)
                        }}>Simpan</Button>

                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}


export default StockAdjustmentPage