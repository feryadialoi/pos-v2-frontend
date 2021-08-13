import {Fragment} from "react";
import BrandBreadcrumb from "./BrandBreadcrumb";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";


const BrandPage = () => {
    return (
        <Fragment>
            <BrandBreadcrumb/>
            <Card>
                <CardHeader>
                    <CardTitle>Merk</CardTitle>
                </CardHeader>
            </Card>
            <Table />
        </Fragment>
    )

}

export default BrandPage

