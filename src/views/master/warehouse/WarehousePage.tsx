import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const WarehousePage = () => {

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Gudang</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default WarehousePage