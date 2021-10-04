import {AuthState} from "../auth";
import {UserState} from "../user";
import {UnitState} from "../unit";
import {CategoryState} from "../category";
import {ProductState} from "../product";
import {WarehouseState} from "../warehouse";
import {BrandState} from "../brand";
import {SupplierState} from "../supplier";
import {PurchaseState} from "../purchase";
import {PurchaseOrderState} from "../purchase-order";
import {SaleState} from "../sale";
import {SaleOrderState} from "../sale-order";
import {ChartOfAccountState} from "../chart-of-account";
import {CustomerState} from "../customer";
import {EmployeeState} from "../employee";
import {CompanyState} from "../company";
import {SalesmanState} from "../salesman";

export interface RootState {
    auth: AuthState
    user: UserState
    unit: UnitState
    category: CategoryState,
    product: ProductState,
    warehouse: WarehouseState,
    brand: BrandState,
    supplier: SupplierState,
    purchase: PurchaseState,
    purchaseOrder: PurchaseOrderState,
    sale: SaleState,
    saleOrder: SaleOrderState,
    chartOfAccount: ChartOfAccountState
    customer: CustomerState,
    employee: EmployeeState,
    company: CompanyState,
    salesman: SalesmanState
}