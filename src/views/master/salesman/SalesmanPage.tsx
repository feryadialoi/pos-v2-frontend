import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const SalesmanPage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Salesman</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default SalesmanPage