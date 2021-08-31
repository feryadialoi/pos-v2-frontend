import {lazy} from 'react'
import {AppRoute} from "./index";

const ReportRoutes: AppRoute[] = [
    {
        path: "/reports/retail-sales",
        component: lazy(() => import("../../views/report/retail-sale/RetailSalePage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/reports/wholesale-sales",
        component: lazy(() => import("../../views/report/wholesale-sale/WholesaleSalePage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/reports/setting-product-stocks",
        component: lazy(() => import("../../views/report/product-stock/ProductStockPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/reports/stock-mutations",
        component: lazy(() => import("../../views/report/stock-mutation/StockMutationPage")),
        meta: {
            authRoute: true
        }
    },
]

export default ReportRoutes