import {Fragment, useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import {Page} from "../../../models/Page";
import {Warehouse} from "../../../models/Warehouse";
import {initialPage} from "../../../redux/reducers/constant";
import {warehouseApiService} from "../../../apiservice/warehouse";
import Table from "./Table";


const WarehousePage = () => {

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Gudang
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <Table/>
            </Card>
        </Fragment>
    )
}

export default WarehousePage