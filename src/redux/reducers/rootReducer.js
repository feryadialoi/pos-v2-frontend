// ** Redux Imports
import {combineReducers} from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import user from './user'
import unit from './unit'
import category from './category'
import product from './product'
import warehouse from './warehouse'
import brand from "./brand"
import supplier from './supplier'
import purchase from './purchase'
import purchaseOrder from './purchase-order'
import sale from './sale'
import saleOrder from './sale-order'
import chartOfAccount from './chart-of-account'
import customer from './customer'
import employee from './employee'
import company from './company'
import salesman from './salesman'

const rootReducer = combineReducers({
    auth,
    navbar,
    layout,
    user,
    unit,
    category,
    product,
    warehouse,
    brand,
    supplier,
    purchase,
    purchaseOrder,
    sale,
    saleOrder,
    chartOfAccount,
    customer,
    employee,
    company,
    salesman,
})

export default rootReducer
