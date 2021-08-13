import {lazy} from 'react'
import {AppRoute} from "./index";

const UserRoutes: AppRoute[] = [
    {
        path: "/users",
        component: lazy(() => import("../../views/master/product/ProductPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/roles",
        component: lazy(() => import("../../views/master/product/ProductPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/permissions",
        component: lazy(() => import("../../views/master/product/ProductPage")),
        meta: {
            authRoute: true
        }
    },
]

export default UserRoutes