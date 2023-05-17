import API from 'API';
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_BY_ID,
    DELETE_PRODUCT_BY_ID_ERROR,
    DELETE_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID_ERROR,
    UPDATE_PRODUCT_BY_ID_SUCCESS
} from 'store/constant';
import Notification from 'utils/Notification';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCTS
        });
        const { data, status } = await API.get('/product');

        if (status === 200) {
            const { data: products } = data;
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: products
            });
        } else {
            Notification('error');
            dispatch({
                type: GET_PRODUCTS_ERROR
            });
        }
    } catch (error) {
        Notification('error');
        dispatch({
            type: GET_PRODUCTS_ERROR
        });
    }
};

export const createProduct = (details) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_PRODUCT
        });
        const { data, status } = await API.post('/product', details, {
            headers: headers
        });

        if (status === 201) {
            const { data: product, message } = data;
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: product
            });

            Notification('success', message);
        } else {
            const { message } = data;
            Notification('error', message);
            dispatch({
                type: CREATE_PRODUCT_ERROR
            });
        }
    } catch (err) {
        Notification('error');
        dispatch({
            type: CREATE_PRODUCT_ERROR
        });
    }
};

export const deleteProduct = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.delete(`/product/${_id}`);

        if (status === 200) {
            dispatch({
                type: DELETE_PRODUCT_BY_ID_SUCCESS,
                payload: data
            });
            Notification('success', message);
        } else {
            dispatch({
                type: DELETE_PRODUCT_BY_ID_ERROR
            });
            Notification('error', message);
        }
    } catch (err) {
        dispatch({
            type: DELETE_PRODUCT_BY_ID_ERROR
        });
        Notification('error');
    }
};

export const updateProduct = (formData, _id) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.put(`/product/${_id}`, formData, {
            headers: headers
        });

        if (status === 200) {
            dispatch({
                type: UPDATE_PRODUCT_BY_ID_SUCCESS,
                payload: data
            });

            Notification('success', message);
        } else {
            Notification('error', message);
            dispatch({
                type: UPDATE_PRODUCT_BY_ID_ERROR
            });
        }
    } catch (err) {
        Notification('error');
        dispatch({
            type: UPDATE_PRODUCT_BY_ID_ERROR
        });
    }
};
