import {Fragment, useState} from "react";
import {
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row, UncontrolledButtonDropdown
} from "reactstrap";
import {Search} from "react-feather";
import ModalSelectProduct from "../../component/modal-select-product/ModalSelectProduct";
import {Product} from "../../../models/Product";

const SaleOrderAddPage = () => {

    const [isModalSelectProductVisible, setIsModalSelectProductVisible] = useState(false)

    const onClickSelectedProduct = (product: Product) => {
        console.log(product)
    }

    return (
        <Fragment>
            <ModalSelectProduct
                isOpen={isModalSelectProductVisible}
                onSelect={onClickSelectedProduct}
                toggleModal={() => setIsModalSelectProductVisible(!isModalSelectProductVisible)}
                toggleHeader={() => setIsModalSelectProductVisible(!isModalSelectProductVisible)}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Tambah Pesanan Penjualan</CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardBody>
                    Filter
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col md={12} className="d-flex justify-content-end">
                            <Button color="primary" outline onClick={() => {
                                setIsModalSelectProductVisible(true)
                            }}>
                                <Search size={14} className="mr-1"/>
                                Tambah Produk
                            </Button>
                        </Col>
                    </Row>
                    product list
                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    <Row>
                        <Col className="d-flex justify-content-end">

                            <UncontrolledButtonDropdown>
                                <DropdownToggle color='primary' caret>Simpan</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className="d-flex justify-content-end">Simpan sebagai Draft</DropdownItem>
                                    <DropdownItem>Simpan & Setujui</DropdownItem>
                                    <DropdownItem>Simpan & Ajukan Persetujuan</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                            {/*<Button color="primary" size="lg">Simpan</Button>*/}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default SaleOrderAddPage