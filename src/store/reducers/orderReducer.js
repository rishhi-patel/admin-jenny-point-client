// project imports
import config from 'config';

// action - state management
import * as actionTypes from '../actions';
import { GET_ORDERS, GET_ORDERS_ERROR, GET_ORDERS_SUCCESS } from 'store/constant';

export const initialState = {
    loadinf: true,
    orders: [],
    selectedOrder: {}
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
        default:
            return state;
    }
};

export default orderReducer;
