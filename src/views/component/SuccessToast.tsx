import {Fragment} from "react";
import {Check} from "react-feather";
// @ts-ignore
import Avatar from '@components/avatar'
import {toast} from "react-toastify";

interface SuccessToastProps {
    message?: string
}

const SuccessToast = ({message}: SuccessToastProps) => {
    return (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Check size={12}/>}/>
                    <h6 className='toast-title'>Success!</h6>
                </div>
                <small className='text-muted'>{new Date().toDateString()}</small>
            </div>
            <div className='toastify-body'>
              <span role='img' aria-label='toast-text'>
                  {message ? message : "aksi berhasil"}
              </span>
            </div>
        </Fragment>
    )
}


export default SuccessToast

export const notifySuccess = (message?: string) => toast.success(<SuccessToast
    message={message}/>, {hideProgressBar: true})
