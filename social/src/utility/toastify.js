import {toast} from 'react-toastify'

export const createToastify = (msg)=>{
    return toast.error(msg)
}