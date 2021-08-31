// @ts-ignore
import Spinner from '@components/spinner/Loading-spinner'
import {Fragment} from 'react';
import {CardText} from "reactstrap";


interface LoaderProps {
    message?: string
}

const Loader = ({message}: LoaderProps) => {
    return (
        <div>
            <Spinner/>
            <CardText>{message || "Please Wait..."}</CardText>
        </div>
    )
}
export default Loader