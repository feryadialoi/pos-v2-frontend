// @ts-ignore
import {selectThemeColors} from '@utils'
import {Fragment, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    TabContent,
    TabPane
} from "reactstrap";
import SettingChartOfAccountContentTab from "./SettingChartOfAccountContentTab";
import PurchaseTabContent from "./PurchaseTabContent";
import SaleTabContent from "./SaleTabContent";
import InventoryTabContent from "./InventoryTabContent";
import FinanceTabContent from "./FinanceTabContent";

const SettingChartOfAccountPage = () => {

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Pengaturan Akun</CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardBody>
                    <SettingChartOfAccountContentTab
                        defaultActive={"PURCHASE"}
                        purchaseContent={<PurchaseTabContent/>}
                        saleContent={<SaleTabContent/>}
                        inventoryContent={<InventoryTabContent/>}
                        financeContent={<FinanceTabContent/>}

                    />
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default SettingChartOfAccountPage