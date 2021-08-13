import {Fragment} from 'react'
import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, BreadcrumbItem, Breadcrumb} from 'reactstrap'
import Table from "./Table";
import UnitBreadcrumb from "./UnitBreadcrumb";


const UnitPage = () => {
    return (
        <Fragment>
            <UnitBreadcrumb/>
            <Card>
                <CardHeader>
                    <CardTitle>Satuan</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default UnitPage
