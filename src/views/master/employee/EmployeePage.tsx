import {Fragment} from "react";
import {Card, CardHeader, CardTitle} from "reactstrap";
import Table from "./Table";

const EmployeePage = () => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Karyawan</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default EmployeePage