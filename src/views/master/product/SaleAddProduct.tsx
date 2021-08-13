import {Fragment, useEffect, useState} from "react";
import {CardText, Col, CustomInput, FormGroup, Input, Label, Row} from "reactstrap";
import {Unit} from "../../../models/Unit";
import CurrencyInput, {formatValue} from "react-currency-input-field";

interface UnitInSale {
    isUseInSale: boolean
    unit: Unit
    price: string
}

const SaleAddProduct = () => {
    const [units, setUnits] = useState<UnitInSale[]>([
        {
            isUseInSale: false,
            unit: {
                id: 1,
                name: "Dus"
            },
            price: "80000"
        },
        {
            isUseInSale: false,
            unit: {
                id: 2,
                name: "Kotak"
            },
            price: "10000"
        },
        {
            isUseInSale: false,
            unit: {
                id: 3,
                name: "Pcs"
            },
            price: "1000"
        },
    ])


    useEffect(() => {
        console.log("tab penjualan")
    }, [])

    const unitPriceValue = (unit: UnitInSale) => {
        return unit.price
    }

    const handleOnChangeUnitPrice = (index: number) => (value, name) => {

        const temp = [...units]
        temp[index].price = value == undefined ? "" : value
        setUnits(temp)

    }

    return (
        <Fragment>
            <p>Gunakan satuan di penjualan</p>

            {units.map((unit, index) => (
                <Row key={index}>
                    <FormGroup key={index} className="d-flex justify-content-center align-items-center ml-1 mt-2">
                        <CustomInput
                            type='checkbox' id={`unit${index}`}
                            name='primary'
                            inline
                            checked={unit.isUseInSale}
                            onChange={(event) => {
                                console.log(event.target.checked)
                                const temp = [...units]
                                temp[index].isUseInSale = event.target.checked
                                setUnits(temp)
                            }}
                        />
                    </FormGroup>
                    <Col>
                        <Label>Nama satuan</Label>
                        <Input disabled value={unit.unit.name}/>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Label>Harga</Label>
                            <CurrencyInput
                                className="form-control"
                                name="price"
                                placeholder="10.000"
                                defaultValue={1000}
                                decimalsLimit={2}
                                groupSeparator={"."}
                                decimalSeparator={","}
                                value={unitPriceValue(unit)}
                                onValueChange={handleOnChangeUnitPrice(index)}
                            />

                        </FormGroup>
                    </Col>
                </Row>
            ))}
        </Fragment>
    )
}

export default SaleAddProduct