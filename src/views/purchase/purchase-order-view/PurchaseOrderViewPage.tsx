import {Fragment, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    FormGroup, Input,
    Label,
    Row
} from "reactstrap";
import {purchaseOrderApiService} from "../../../apiservice/purchase-order";
import {useHistory, useParams} from "react-router-dom";
import {DetailedPurchaseOrder} from "../../../models/DetailedPurchaseOrder";
import DataTable from "react-data-table-component";
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import {Check, Printer} from "react-feather";
import {formatDateToReadableDate} from "../../../utility/date-format-util";
import columns from "./columns";
import NominalPurchaseOrder from "./NominalPurchaseOrder";
import {HttpNotFoundError} from "../../../apiservice/http-error";


interface PurchaseOrderViewPageParams {
    purchaseOrderId: string
}

const PurchaseOrderViewPage = () => {

    const [detailedPurchaseOrder, setDetailedPurchaseOrder] = useState<DetailedPurchaseOrder | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const params = useParams<PurchaseOrderViewPageParams>()
    const history = useHistory()

    const getPurchaseOrder = () => {
        purchaseOrderApiService.getPurchaseOrder(params.purchaseOrderId)
            .then(response => {
                console.log(response.data)
                setDetailedPurchaseOrder(response.data.data)
            })
            .catch(error => {
                console.log("purchaseOrderApiService.getPurchaseOrder.error", error?.response?.data)
                if (error instanceof HttpNotFoundError) {
                }
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    useEffect(() => {
        getPurchaseOrder()
    }, [])

    const dataToRender = () => {
        return detailedPurchaseOrder?.purchaseOrderDetails.map((item, index) => ({
            ...item,
            no: index + 1
        })) || []
    }

    const approvePurchaseOrder = () => {
        purchaseOrderApiService.approvePurchaseOrder({
            purchaseOrderId: params.purchaseOrderId
        }).then(response => {

        }).catch(error => {
            console.log(error?.response?.data)
        })
    }

    const gotoPurchaseAddPage = () => {
        history.push("/purchases/add", {
            purchaseOrderId: detailedPurchaseOrder?.id
        })
    }

    // ** render section
    if (isLoading) return <p>Loading...</p>

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Pesanan Pembelian <span className="font-weight-bolder">{detailedPurchaseOrder?.code}</span>
                    </CardTitle>
                </CardHeader>
            </Card>

            {
                !detailedPurchaseOrder && <Card>
                    <CardBody>
                        <p>Pesanan Pembelian Tidak Ditemukan</p>
                    </CardBody>
                </Card>
            }

            {
                detailedPurchaseOrder && <Card>
                    <CardBody className="pb-1">
                        <Row>
                            <Col className="d-flex justify-content-end align-content-center">
                                <div>
                                    <Button outline color="primary" className="mr-1"><Printer size={14}
                                                                                              className="mr-1"/>Print</Button>
                                    <Button color="primary" className="mr-1">
                                        <Check size={14} className="mr-1"/>Approve
                                    </Button>
                                    <Button outline color="primary" onClick={gotoPurchaseAddPage}>Lanjutkan ke
                                        Pembelian</Button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                    <hr/>
                    <CardBody>
                        <Row>
                            <Col md={3}>
                                <p className="font-small-3">Status</p>
                                <p>{detailedPurchaseOrder?.status}</p>
                            </Col>
                            <Col className="mb-2">
                                <p className="font-small-3">Supplier</p>
                                <p>{detailedPurchaseOrder?.supplier.name}</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={3}>
                                <p className="font-small-3">Tanggal Transaksi</p>
                                <p>{formatDateToReadableDate(detailedPurchaseOrder!.entryDate)}</p>
                            </Col>
                            <Col md={3}>
                                <p className="font-small-3">Tanggal Jatuh Tempo</p>
                                {detailedPurchaseOrder?.dueDate
                                    ? <p>{formatDateToReadableDate(detailedPurchaseOrder!.dueDate)}</p>
                                    : <p>-</p>
                                }
                            </Col>
                            <Col md={3}>
                                <p className="font-small-3">Kode</p>
                                <p>{detailedPurchaseOrder?.code}</p>
                            </Col>
                            <Col md={3}>
                                <p className="font-small-3">Reference</p>
                                <p>{detailedPurchaseOrder?.reference || "-"}</p>
                            </Col>
                        </Row>
                    </CardBody>
                    <DataTable
                        className='react-dataTable'
                        responsive
                        noHeader
                        data={dataToRender()}
                        columns={columns}
                    />
                    <hr/>
                    <CardBody>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Catatan</Label>
                                    <Input placeholder="Catatan..." type="textarea" rows={3}/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <NominalPurchaseOrder detailedPurchaseOrder={detailedPurchaseOrder}/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            }
        </Fragment>
    )
}

export default PurchaseOrderViewPage