import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {ReactNode, useState} from "react";

type ActiveTab = "PURCHASE" | "SALE" | "INVENTORY" | "FINANCE"

interface SettingChartOfAccountContentTabProps {
    defaultActive: ActiveTab
    purchaseContent: ReactNode
    saleContent: ReactNode
    inventoryContent: ReactNode
    financeContent: ReactNode
}

const SettingChartOfAccountContentTab = (props: SettingChartOfAccountContentTabProps) => {

    const {defaultActive, purchaseContent, saleContent, inventoryContent, financeContent} = props
    const [active, setActive] = useState<ActiveTab>(defaultActive)

    const toggle = (tab: ActiveTab) => () => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            <Nav tabs fill>
                <NavItem>
                    <NavLink className="p-1" active={active === 'PURCHASE'}
                             onClick={toggle('PURCHASE')}>Pembelian</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="p-1" active={active === 'SALE'}
                             onClick={toggle('SALE')}>Penjualan</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="p-1" active={active === 'INVENTORY'}
                             onClick={toggle('INVENTORY')}>Persediaan</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="p-1" active={active === 'FINANCE'}
                             onClick={toggle('FINANCE')}>Finance</NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='PURCHASE'>
                    {purchaseContent}
                </TabPane>
                <TabPane tabId='SALE'>
                    {saleContent}
                </TabPane>
                <TabPane tabId='INVENTORY'>
                    {inventoryContent}
                </TabPane>
                <TabPane tabId='FINANCE'>
                    {financeContent}
                </TabPane>
            </TabContent>
        </>
    )
}

export default SettingChartOfAccountContentTab

const Dummy = () => {
    return (
        <>
            <p>
                Chocolate cake sweet roll lemon drops marzipan chocolate cake cupcake cotton candy. Dragée ice cream
                dragée
                biscuit chupa chups bear claw cupcake brownie cotton candy. Sesame snaps topping cupcake cake. Macaroon
                lemon drops gummies danish marzipan donut.
            </p>
            <p>
                Chocolate bar soufflé tiramisu tiramisu jelly-o carrot cake gummi bears cake. Candy canes wafer
                croissant
                donut bonbon dragée bear claw jelly sugar plum. Sweet lemon drops caramels croissant cheesecake jujubes
                carrot cake fruitcake. Halvah biscuit lemon drops fruitcake tart.
            </p>
        </>
    )
}