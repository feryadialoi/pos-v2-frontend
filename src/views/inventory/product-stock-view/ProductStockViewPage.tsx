import {Fragment, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import {useParams} from "react-router-dom";


interface ProductStockViewPageParams {
    warehouseId: string
    productStockId: string
}

const ProductStockViewPage = () => {

    const params = useParams()

    const [] = useState()

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Stok Produk
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardBody>
                    stok...
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default ProductStockViewPage