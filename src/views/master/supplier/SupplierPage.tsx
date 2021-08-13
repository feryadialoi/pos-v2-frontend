import {Card, CardBody, CardHeader, CardTitle} from "reactstrap"
import {Fragment} from "react"
import SupplierBreadcrumb from "../category/SupplierBreadcrumb"
import Table from "./Table";

const SupplierPage = () => {
    return (
        <Fragment>
            <SupplierBreadcrumb/>
            <Card>
                <CardHeader>
                    <CardTitle>Supplier</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default SupplierPage