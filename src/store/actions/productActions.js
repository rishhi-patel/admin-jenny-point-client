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
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_ERROR,
    GET_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID_ERROR,
    UPDATE_PRODUCT_BY_ID_SUCCESS
} from 'store/constant';
import Notification from 'utils/Notification';

export const getProducts = (query) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCTS
        });
        const { data, status } = await API.get('/product', query);

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
export const getProductById = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PRODUCT_BY_ID
        });
        const { data, status } = await API.get(`/product/${_id}`);

        if (status === 200) {
            const { data: product } = data;
            dispatch({
                type: GET_PRODUCT_BY_ID_SUCCESS,
                payload: product
            });
        } else {
            Notification('error');
            dispatch({
                type: GET_PRODUCT_BY_ID_ERROR
            });
        }
    } catch (error) {
        Notification('error');
        dispatch({
            type: GET_PRODUCT_BY_ID_ERROR
        });
    }
};

export const createProduct = (details, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_PRODUCT
        });
        const { data, status } = await API.post('/product', details);

        if (status === 200) {
            const { data: product, message } = data;
            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: product
            });

            Notification('success', message);
            navigate('/dashboard/products');
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

export const updateProduct = (_id, ProductDetails, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.put(`/product/${_id}`, ProductDetails);

        if (status === 200) {
            dispatch({
                type: UPDATE_PRODUCT_BY_ID_SUCCESS,
                payload: data
            });

            Notification('success', message);
            navigate('/dashboard/products');
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
