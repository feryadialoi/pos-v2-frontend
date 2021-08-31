import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const SalePage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Penjualan</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default SalePage