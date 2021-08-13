import {Page} from "../../../models/page";
import {Warehouse} from "../../../models/Warehouse";

export interface WarehouseState {
    pageOfWarehouse: Page<Warehouse>
}