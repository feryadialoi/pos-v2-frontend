import {formatValue} from "react-currency-input-field";
import {Col, Row} from "reactstrap";

interface NominalTitleValueProps {
    title: string
    value: any
    valueSize?: "md" | "lg" | "xl"
}

const NominalTitleValue = ({title, value, valueSize}: NominalTitleValueProps) => {

    const formattedValue = formatValue({
        value: value.toString(),
        decimalSeparator: ",",
        groupSeparator: ".",
    })

    const valueText = () => {
        switch (valueSize) {
            case "md":
                return <dd className="">{formattedValue}</dd>
            case "lg":
                return <h4 className="mb-0">{formattedValue}</h4>
            case "xl":
                return <h3 className="mb-0">{formattedValue}</h3>
            default:
                return <dd className="">{formattedValue}</dd>
        }
    }

    return (
        <dl>
            <Row className="align-items-center">
                <Col md={9}>
                    <dt className="text-right">{title}</dt>
                </Col>
                <Col md={3}>
                    {valueText()}
                </Col>
            </Row>
        </dl>
    )
}

export default NominalTitleValue