import { toast } from 'react-toastify';

const options = {
    position:toast.POSITION.BOTTOM_RIGHT,
    theme:"dark",
    autoClose:3000
}

const notify = {
    success(message){
        toast.success(message,options);
    },
    info(message){
        toast.info(message,options);
    }
}

export default notify;