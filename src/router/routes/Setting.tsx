import {lazy} from 'react'
import {AppRoute} from "./index";

const SettingRoutes: AppRoute[] = [
    {
        path: "/settings/products",
        component: lazy(() => import("../../views/setting/setting-product/SettingProductPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/settings/coas",
        component: lazy(() => import("../../views/setting/setting-coa/SettingChartOfAccountPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/settings/companies",
        component: lazy(() => import("../../views/setting/setting-company/SettingCompanyPage")),
        meta: {
            authRoute: true
        }
    }
]

export default SettingRoutes