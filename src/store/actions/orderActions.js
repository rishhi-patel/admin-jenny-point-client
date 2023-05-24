import API from 'API';
import { GET_ORDERS, GET_ORDERS_ERROR, GET_ORDERS_SUCCESS } from 'store/constant';
import Notification from 'utils/Notification';

export const getOrders = (status) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ORDERS
        });
        const {
            data: { data, message },
            status
        } = await API.get(`/admin/order`);

        if (status === 200) {
            dispatch({
                type: GET_ORDERS_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
            dispatch({
                type: GET_ORDERS_ERROR
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ORDERS_ERROR
        });
    }
};
