import {Fragment, useEffect, useState} from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {DetailedPurchase} from "../../../models/DetailedPurchase";
import {purchaseApiService} from "../../../apiservice/purchase";
import {notifyError} from "../../component/ErrorToast";

interface PurchasePageViewPageLocationParams {
    purchaseId: string
}

const PurchaseViewPage = () => {

    const location = useLocation<PurchasePageViewPageLocationParams | undefined>()
    const params = useParams<PurchasePageViewPageLocationParams>()
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(true)
    const [detailedPurchase, setDetailedPurchase] = useState<DetailedPurchase | null>(null)


    const getPurchase = () => {
        purchaseApiService.getPurchase(params.purchaseId)
            .then(response => {
                setDetailedPurchase(response.data.data)
            })
            .catch(error => {
                notifyError(error?.response?.error)
                console.error(error?.response)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getPurchase()
    }, [])


    // ** render section
    if (isLoading) return <p>Loading...</p>

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Pembelian <span className="font-weight-bolder">{detailedPurchase?.code}</span>
                    </CardTitle>
                </CardHeader>
            </Card>


            <Card>
                <CardBody>
                    <p>{location.state?.purchaseId}</p>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default PurchaseViewPage