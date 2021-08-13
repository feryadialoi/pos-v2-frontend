import {Fragment} from 'react'
import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink} from 'reactstrap'
import Table from "./Table";
import CategoryBreadcrumb from "./CategoryBreadcrumb";

const CategoryPage = () => {
    return (
        <Fragment>
            <CategoryBreadcrumb/>
            <Card>
                <CardHeader>
                    <CardTitle>Kategori</CardTitle>
                </CardHeader>
            </Card>
            <Table/>
        </Fragment>
    )
}

export default CategoryPage
