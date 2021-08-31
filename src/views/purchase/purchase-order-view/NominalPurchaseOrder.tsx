import {DetailedPurchaseOrder} from "../../../models/DetailedPurchaseOrder";
import {CardBody} from "reactstrap";
import NominalTitleValue from "../../component/NominalTitleValue";

interface NewComponentProps {
    detailedPurchaseOrder: DetailedPurchaseOrder | null
}

const NominalPurchaseOrder = (props: NewComponentProps) => {
    const {detailedPurchaseOrder} = props
    return (
        <>
            <NominalTitleValue valueSize="lg" title="Diskon" value={detailedPurchaseOrder?.discount ?? 0}/>
            <NominalTitleValue valueSize="lg" title="Pajak" value={detailedPurchaseOrder?.tax ?? 0}/>
            <NominalTitleValue valueSize="lg" title="Biaya Pengiriman" value={detailedPurchaseOrder?.shippingFee ?? 0}/>
            <NominalTitleValue valueSize="lg" title="Biaya Lain-lain" value={detailedPurchaseOrder?.otherFee ?? 0}/>
            <NominalTitleValue valueSize="lg" title="Total" value={detailedPurchaseOrder?.total ?? 0}/>
            <NominalTitleValue valueSize="lg" title="Grand Total" value={detailedPurchaseOrder?.grandTotal ?? 0}/>
        </>
    );
}

export default NominalPurchaseOrder