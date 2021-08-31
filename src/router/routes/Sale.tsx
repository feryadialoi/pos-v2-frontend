import {lazy} from 'react'
import {AppRoute} from "./index";

const SaleRoutes: AppRoute[] = [
    {
        path: "/sale-orders",
        component: lazy(() => import("../../views/sale/sale-order/SaleOrderPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sale-orders/add",
        component: lazy(() => import("../../views/sale/sale-order-add/SaleOrderAddPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sales",
        component: lazy(() => import("../../views/sale/sale/SalePage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sales/add",
        component: lazy(() => import("../../views/sale/sale-add/SaleAddPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sale-returns",
        component: lazy(() => import("../../views/sale/sale-return/SaleReturnPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sale-revisions",
        component: lazy(() => import("../../views/sale/sale-revision/SaleRevisionPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },

]

export default SaleRoutes