import API from 'API';
import {
    GET_ORDERS,
    GET_ORDERS_ERROR,
    GET_ORDERS_SUCCESS,
    GET_ORDER_BY_ID,
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_SUCCESS
} from 'store/constant';
import Notification from 'utils/Notification';

export const getOrders = (params) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ORDERS
        });
        const {
            data: { data, message },
            status
        } = await API.get(`/admin/order`, params);

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

export const getOrderByID = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ORDER_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.get(`/order/${id}`);

        if (status === 200) {
            dispatch({
                type: GET_ORDER_BY_ID_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
            dispatch({
                type: GET_ORDER_BY_ID_ERROR
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ORDER_BY_ID_ERROR
        });
    }
};

export const assignDistributor = (value, id) => async (dispatch) => {
    try {
        const {
            data: { data, message },
            status
        } = await API.patch(`/order/${id}`, { key: 'distributor', value });

        if (status === 200) {
            Notification('success', message);
            dispatch({
                type: GET_ORDER_BY_ID_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
        }
    } catch ({ message }) {
        Notification('error', message);
    }
};
