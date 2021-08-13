import {lazy, ReactNode} from 'react'
import MasterRoutes from "./Master";
import AccountingRoutes from "./Accounting";
import User from "./User";
import Sale from "./Sale";
import Purchase from "./Purchase";
import ReportRoutes from "./Report";
import WarehouseRoutes from "./Warehouse";


export interface AppRouteMeta {
    authRoute: boolean;
}

export interface AppRoute {
    path: string;
    component: ReactNode;
    layout?: string;
    meta?: AppRouteMeta;
}


// ** Document title
const TemplateTitle = '%s - POS'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes: AppRoute[] = [
    ...MasterRoutes,
    ...Sale,
    ...Purchase,
    ...WarehouseRoutes,
    ...AccountingRoutes,
    ...User,
    {
        path: '/login',
        component: lazy(() => import('../../views/LoginPage')),
        layout: 'BlankLayout',
    },
    {
        path: '/home',
        component: lazy(() => import('../../views/Home')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/dashboard',
        component: lazy(() => import('../../views/DashboardPage')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() => import('../../views/Error')),
        layout: 'BlankLayout'
    },

    {
        path: '/receivables',
        component: lazy(() => import('../../views/receivable/ReceivablePage')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/payables',
        component: lazy(() => import('../../views/payable/PayablePage')),
        meta: {
            authRoute: true
        }
    },
    {
        path: '/warehouses',
        component: lazy(() => import('../../views/SecondPage')),
        meta: {
            authRoute: true
        }
    },
    ...ReportRoutes
]

export {DefaultRoute, TemplateTitle, Routes}
