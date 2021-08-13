import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col} from 'reactstrap'

const Home = () => {
    return (
        <div>
            <Row className="justify-content-center mb-4">
                <p className="display-3 text-center">Welcome to POS V2</p>
            </Row>
            <Row className="justify-content-center">
                <img className="col-md-5" src={"http://trialinventory.grhadigital.id/images/404.png?0a38972b4083f43522258cbe550a3cb7"}/>
            </Row>
        </div>
    )
}

export default Home
