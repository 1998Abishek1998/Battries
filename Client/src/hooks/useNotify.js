import { notification } from 'antd';

const useNotify = ({type}) => {
  
  const openNotification = (message) => {
    const payload = {
      placement: 'topRight',
      message,
    }

    if(type === "error") notification.error(payload)  
    else if(type === 'success') notification.success(payload)
    else notification.info(payload)
  };

  return openNotification;
};

export default useNotify;
