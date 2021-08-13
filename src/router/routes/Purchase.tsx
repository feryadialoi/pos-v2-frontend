import {lazy} from 'react'
import {AppRoute} from "./index";

const PurchaseRoutes: AppRoute[] = [
    {
        path: "/purchase-orders",
        component: lazy(() => import("../../views/purchase/purchase-order/PurchaseOrderPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchases",
        component: lazy(() => import("../../views/purchase/purchase/PurchasePage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchase-returns",
        component: lazy(() => import("../../views/purchase/purchase-return/PurchaseReturnPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchase-revisions",
        component: lazy(() => import("../../views/purchase/purchase-revision/PurchaseRevisionPage")),
        meta: {
            authRoute: true
        }
    },

]

export default PurchaseRoutes