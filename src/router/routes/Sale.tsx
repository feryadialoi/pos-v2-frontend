import {lazy} from 'react'
import {AppRoute} from "./index";

const SaleRoutes: AppRoute[] = [
    {
        path: "/sale-orders",
        component: lazy(() => import("../../views/sale/sale-order/SaleOrderPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sales",
        component: lazy(() => import("../../views/sale/sale/SalePage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sale-returns",
        component: lazy(() => import("../../views/sale/sale-return/SaleReturnPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/sale-revisions",
        component: lazy(() => import("../../views/sale/sale-revision/SaleRevisionPage")),
        meta: {
            authRoute: true
        }
    },

]

export default SaleRoutes