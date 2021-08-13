import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink} from 'reactstrap'
import {Fragment} from "react"
import Table from "./Table"
import ProductBreadcrumb from "./ProductBreadcrumb"
import BigDecimal from 'js-big-decimal'

const ProductPage = () => {
    const x = 0.2
    const y = 0.3

    const a = new BigDecimal("0.02")
    const b = new BigDecimal("0.03")
    const subtraction = a.subtract(b)

    return (
        <Fragment>
            <ProductBreadcrumb/>
            <Card>
                <CardHeader>
                    <CardTitle>Produk</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default ProductPage
