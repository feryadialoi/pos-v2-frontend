import {Fragment} from "react";
import {Button, Card, CardBody, Col, FormGroup, Input, Label, Row} from "reactstrap";

const AddSupplierForm = () => {
    return (
        <Fragment>
            <Row>
                <Col>

                </Col>
            </Row>

            <FormGroup>
                <Label>Nama</Label>
                <Input placeholder="Nama"/>
            </FormGroup>
            <FormGroup>
                <Label>Kode Supplier</Label>
                <Input placeholder="Kode Supplier"/>
            </FormGroup>
            <FormGroup>
                <Label>Alamat</Label>
                <Input type="textarea" rows={3} placeholder="Alamat"/>
            </FormGroup>


            <FormGroup>
                <Label>PIC</Label>
                <Input pattern="PIC"/>
            </FormGroup>

            <FormGroup>
                <Label>Nomor Telepon</Label>
                <Input/>
            </FormGroup>

            <FormGroup>
                <Label>Email</Label>
                <Input/>
            </FormGroup>

            <hr/>

            <h2>Bank</h2>

            <FormGroup>
                <Label>Nama Bank</Label>
                <Input/>
            </FormGroup>

            <FormGroup>
                <Label>Cabang Bank</Label>
                <Input/>
            </FormGroup>

            <FormGroup>
                <Label>Nomor Rekening</Label>
                <Input/>
            </FormGroup>

            <FormGroup>
                <Label>NPWP</Label>
                <Input placeholder="NPWP"/>
            </FormGroup>

            <FormGroup>
                <Label>Nama PKP</Label>
                <Input placeholder="NPWP"/>
            </FormGroup>

            <FormGroup>
                <Label>Alamat PKP</Label>
                <Input placeholder="NPWP"/>
            </FormGroup>

            <FormGroup className="d-flex justify-content-end">
                <Button color="primary" className="mr-1" onClick={() => {
                }}>Simpan</Button>
                <Button color="primary" outline onClick={() => {
                }}>Reset</Button>
            </FormGroup>


        </Fragment>
    )
}

export default AddSupplierForm;