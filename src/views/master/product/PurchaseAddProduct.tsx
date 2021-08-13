import {Fragment} from "react";
import {CustomInput, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";


const PurchaseAddProduct = () => {
    const {register, errors, handleSubmit,} = useForm()


    const handleForm = (data) => {
        console.log(data)
    }


    return (
        <Fragment>
            <Form onSubmit={handleSubmit(handleForm)}>
                <FormGroup>
                    <label htmlFor='price'>Harga</label>
                    <Input id="price" name="price"/>
                </FormGroup>
                <FormGroup className="d-flex justify-content-end">
                    <Label htmlFor="ppn" className="mr-2">Termasuk pajak dari supplier</Label>
                    <CustomInput
                        type='switch'
                        id='ppn'
                        name='ppn'
                        label='PPN (10%)'
                        inline
                    />
                </FormGroup>
            </Form>
        </Fragment>
    )
}

export default PurchaseAddProduct