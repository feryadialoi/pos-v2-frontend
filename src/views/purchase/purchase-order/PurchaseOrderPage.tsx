import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const PurchaseOrderPage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Pesanan Pembelian
                    </CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default PurchaseOrderPage