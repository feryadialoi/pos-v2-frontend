import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const ChartOfAccountPage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Kode Akun Akuntansi</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default ChartOfAccountPage