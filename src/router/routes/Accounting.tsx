import {lazy} from 'react'
import {AppRoute} from "./index";

const AccountingRoutes: AppRoute[] = [
    {
        path: "/chart-of-account",
        component: lazy(() => import("../../views/accounting/chart-of-account/ChartOfAccountPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/journals",
        component: lazy(() => import("../../views/accounting/journal/JournalPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/general-ledgers",
        component: lazy(() => import("../../views/accounting/general-ledger/GeneralLedgerPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/balance-sheets",
        component: lazy(() => import("../../views/accounting/balance-sheet/BalanceSheetPage")),
        meta: {
            authRoute: true
        }
    },
    {
        path: "/financial-statements",
        component: lazy(() => import("../../views/accounting/financial-statement/FinancialStatementPage")),
        meta: {
            authRoute: true
        }
    },
]

export default AccountingRoutes