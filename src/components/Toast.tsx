import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  message: string;
  error?: unknown;
}

const Toast = (props: Props) => {
  return !props.error
    ? toast.success(`${props.message}`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    : toast.error(`${props.message}: ${props.error}`, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
};

export default Toast;
