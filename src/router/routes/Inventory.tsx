import {lazy} from 'react'
import {AppRoute} from "./index";

const InventoryRoutes: AppRoute[] = [
    {
        path: "/inventories/warehouses",
        component: lazy(() => import("../../views/inventory/warehouse/WarehousePage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/inventories/warehouses/view/:warehouseId",
        component: lazy(() => import("../../views/inventory/warehouse-view/WarehouseViewPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: "/inventories/warehouses/view/:warehouseId/product-stocks/:productStockId",
        component: lazy(() => import("../../views/inventory/product-stock-view/ProductStockViewPage")),
        exact: true,
        meta: {
            authRoute: true
        }
    },
]

export default InventoryRoutes