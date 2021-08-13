import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

const CategoryBreadcrumb = () => {
    return (
        <div className='content-header row'>
            <div className='content-header-left col-md-9 col-12 mb-2'>
                <div className='row breadcrumbs-top'>
                    <div className='col-12'>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/"> Home </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <span> Master Data </span>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                <span> Kategori </span>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryBreadcrumb