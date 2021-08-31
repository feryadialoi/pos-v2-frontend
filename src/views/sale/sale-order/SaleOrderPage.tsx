import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const SaleOrderPage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Pesanan Penjualan
                    </CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default SaleOrderPage