import {AuthState} from "../auth";
import {UserState} from "../user";
import {UnitState} from "../unit";
import {CategoryState} from "../category";
import {ProductState} from "../product";
import {WarehouseState} from "../warehouse";
import {BrandState} from "../brand";

export interface RootState {
    auth: AuthState
    user: UserState
    unit: UnitState
    category: CategoryState,
    product: ProductState,
    warehouse: WarehouseState,
    brand: BrandState
}