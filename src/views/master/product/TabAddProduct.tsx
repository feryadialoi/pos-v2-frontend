import {Fragment, useState} from 'react'

import {Home, Settings} from 'react-feather'
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import ProductGeneralInformation from "./ProductGeneralInformation";
import PurchaseAddProduct from "./PurchaseAddProduct";
import SaleAddProduct from "./SaleAddProduct";

const TabAddProduct = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }
    return (
        <Fragment>
            <Nav tabs fill justified>
                <NavItem>
                    <NavLink
                        active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }}
                    >
                        <Home size={14}/>
                        <span className='align-middle'>Umum</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '2'}
                        onClick={() => {
                            toggle('2')
                        }}
                    >
                        <Settings size={14}/>
                        <span className='align-middle'>Penjualan</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        active={active === '3'}
                        onClick={() => {
                            toggle('3')
                        }}
                    >
                        <Settings size={14}/>
                        <span className='align-middle'>Pembelian</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='1'>
                    <ProductGeneralInformation/>
                </TabPane>
                <TabPane tabId='2'>
                    <SaleAddProduct/>
                </TabPane>
                <TabPane tabId='3'>
                    <PurchaseAddProduct/>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}
export default TabAddProduct
