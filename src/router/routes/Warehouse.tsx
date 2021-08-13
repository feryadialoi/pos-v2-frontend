import {lazy} from 'react'
import {AppRoute} from "./index";

const WarehouseRoutes: AppRoute[] = [
    {
        path: "/stock-adjustments",
        component: lazy(() => import("../../views/warehouse/stock-adjustment/StockAdjustmentPage")),
        meta: {
            authRoute: true
        }
    },
]

export default WarehouseRoutes