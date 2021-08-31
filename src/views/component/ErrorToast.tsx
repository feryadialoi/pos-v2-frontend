import {Fragment} from "react"
import {X} from "react-feather"
// @ts-ignore
import Avatar from '@components/avatar'
import {toast} from "react-toastify";

interface ErrorToastProps {
    message?: string
}

const ErrorToast = ({message}: ErrorToastProps) => {
    return (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='danger' icon={<X size={12}/>}/>
                    <h6 className='toast-title'>Error!</h6>
                </div>
                {/*<small className='text-muted'>11 Min Ago</small>*/}
            </div>
            <div className='toastify-body'>
              <span role='img' aria-label='toast-text'>
                  {message ? message : "Terjadi kesalahan!"}
              </span>
            </div>
        </Fragment>
    )
}

export default ErrorToast

export const notifyError = (message?: string) => toast.error(<ErrorToast message={message}/>, {hideProgressBar: true})
