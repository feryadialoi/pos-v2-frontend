import {lazy} from 'react'
import {AppRoute} from "./index";

const PurchaseRoutes: AppRoute[] = [
    {
        path: "/purchase-orders",
        component: lazy(() => import("../../views/purchase/purchase-order/PurchaseOrderPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchase-orders/add",
        component: lazy(() => import("../../views/purchase/purchase-order-add/PurchaseOrderAddPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchase-orders/view/:purchaseOrderId",
        component: lazy(() => import("../../views/purchase/purchase-order-view/PurchaseOrderViewPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchases",
        component: lazy(() => import("../../views/purchase/purchase/PurchasePage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchases/add",
        component: lazy(() => import("../../views/purchase/purchase-add/PurchaseAddPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchases/view/:purchaseId",
        component: lazy(() => import("../../views/purchase/purchase-view/PurchaseViewPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchase-returns",
        component: lazy(() => import("../../views/purchase/purchase-return/PurchaseReturnPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/purchase-revisions",
        component: lazy(() => import("../../views/purchase/purchase-revision/PurchaseRevisionPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },

]

export default PurchaseRoutes