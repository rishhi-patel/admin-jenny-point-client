import { NotificationManager } from 'react-notifications';

const Notification = (type, message) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message);
            break;
        case 'warning':
            NotificationManager.warning(message);
            break;
        case 'error':
            NotificationManager.error(message || 'Something Went Wrong');
            break;
        default:
            NotificationManager.info(message);
    }
};

export default Notification;
