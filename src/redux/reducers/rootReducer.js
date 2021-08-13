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

const rootReducer = combineReducers({
    auth,
    navbar,
    layout,
    user,
    unit,
    category,
    product,
    warehouse,
    brand
})

export default rootReducer
