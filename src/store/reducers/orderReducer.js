// project imports
import config from 'config';

// action - state management
import * as actionTypes from '../actions';
import {
    GET_ORDERS,
    GET_ORDERS_ERROR,
    GET_ORDERS_SUCCESS,
    GET_ORDER_BY_ID,
    GET_ORDER_BY_ID_ERROR,
    GET_ORDER_BY_ID_SUCCESS
} from 'store/constant';

export const initialState = {
    loadinf: true,
    orders: [],
    selectedOrder: { orderItems: [] }
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const orderReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case GET_ORDERS:
            return { ...state, loading: true };
        case GET_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload };
        case GET_ORDERS_ERROR:
            return { ...state, loading: false };
        case GET_ORDER_BY_ID:
            return { ...state, loading: true };
        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedOrder: action.payload };
        case GET_ORDER_BY_ID_ERROR:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default orderReducer;
