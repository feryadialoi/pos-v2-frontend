import {Fragment} from "react";
import {AlertTriangle, Check} from "react-feather";
// @ts-ignore
import Avatar from '@components/avatar'
import {toast} from "react-toastify";

interface WarningToastProps {
    message?: string
}

const WarningToast = ({message}: WarningToastProps) => {
    return (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='warning' icon={<AlertTriangle size={12}/>}/>
                    <h6 className='text-warning toast-title'>Warning!</h6>
                </div>
                {/*<small className='text-muted'>11 Min Ago</small>*/}
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>{message ? message : "peringatan"}</span>
            </div>
        </Fragment>
    )
}


export default WarningToast

export const notifyWarning = (message?: string) => toast.success(<WarningToast
    message={message}/>, {hideProgressBar: true})
