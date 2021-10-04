import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const CustomerPage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Customer</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default CustomerPage