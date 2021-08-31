import {Page} from "../../../models/Page";
import {Warehouse} from "../../../models/Warehouse";

export interface WarehouseState {
    pageOfWarehouse: Page<Warehouse>
}