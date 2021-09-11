import {Warehouse} from "./Warehouse";
import {Page} from "./Page";
import {ProductStockOfWarehouseWithProductStocks} from "./ProductStockOfWarehouseWithProductStocks";

export interface WarehouseWithProductStocks {
    warehouse: Warehouse
    pageOfProductStock: Page<ProductStockOfWarehouseWithProductStocks>
}