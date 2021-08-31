import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const PurchasePage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Pembelian</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default PurchasePage