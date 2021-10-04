import {lazy} from 'react'
import {AppRoute} from "./index";

const MasterRoutes: AppRoute[] = [
    {
        path: "/products",
        component: lazy(() => import("../../views/master/product/ProductPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/categories",
        component: lazy(() => import("../../views/master/category/CategoryPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/brands",
        component: lazy(() => import("../../views/master/brand/BrandPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/units",
        component: lazy(() => import("../../views/master/unit/UnitPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/warehouses",
        component: lazy(() => import("../../views/master/warehouse/WarehousePage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/employees',
        component: lazy(() => import('../../views/master/employee/EmployeePage')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/salesmen',
        component: lazy(() => import('../../views/master/salesman/SalesmanPage')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/customers',
        component: lazy(() => import('../../views/master/customer/CustomerPage')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/suppliers',
        component: lazy(() => import('../../views/master/supplier/SupplierPage')),
        meta: {
            authRoute: true
        }
    },
]

export default MasterRoutes