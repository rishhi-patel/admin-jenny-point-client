import API from 'API';
import {
    CHANGE_BRAND_MODAL_STATE,
    CHANGE_SELECTED_BRAND,
    CREATE_BRAND,
    CREATE_BRAND_ERROR,
    CREATE_BRAND_SUCCESS,
    DELETE_BRAND_BY_ID,
    DELETE_BRAND_BY_ID_ERROR,
    DELETE_BRAND_BY_ID_SUCCESS,
    GET_BRANDS,
    GET_BRANDS_ERROR,
    GET_BRANDS_SUCCESS,
    UPDATE_BRAND_BY_ID,
    UPDATE_BRAND_BY_ID_ERROR,
    UPDATE_BRAND_BY_ID_SUCCESS
} from 'store/constant';
import Notification from 'utils/Notification';

const headers = {
    'Content-Type': 'multipart/form-data'
};

export const changeModalState = (status) => async (dispatch) => {
    if (!status)
        dispatch({
            type: CHANGE_SELECTED_BRAND,
            payload: null
        });
    dispatch({
        type: CHANGE_BRAND_MODAL_STATE,
        payload: status
    });
};
export const changeBrandSelection = (brand) => async (dispatch) => {
    dispatch({
        type: CHANGE_SELECTED_BRAND,
        payload: brand
    });
};

export const getBrands = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_BRANDS
        });
        const { data, status } = await API.get('/brand');

        if (status === 200) {
            const { data: categories } = data;
            dispatch({
                type: GET_BRANDS_SUCCESS,
                payload: categories
            });
        } else {
            Notification('error');
            dispatch({
                type: GET_BRANDS_ERROR
            });
        }
    } catch (error) {
        Notification('error');
        dispatch({
            type: GET_BRANDS_ERROR
        });
    }
};

export const createBrand = (details) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_BRAND
        });
        const { data, status } = await API.post('/brand', details, {
            headers: headers
        });

        if (status === 200) {
            const { data: brand, message } = data;
            dispatch({
                type: CREATE_BRAND_SUCCESS,
                payload: brand
            });
            dispatch({
                type: CHANGE_BRAND_MODAL_STATE,
                payload: false
            });
            Notification('success', message);
        } else {
            const { message } = data;
            Notification('error', message);
            dispatch({
                type: CREATE_BRAND_ERROR
            });
        }
    } catch (err) {
        Notification('error');
        dispatch({
            type: CREATE_BRAND_ERROR
        });
    }
};

export const deleteBrand = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_BRAND_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.delete(`/brand/${_id}`);

        if (status === 200) {
            dispatch({
                type: DELETE_BRAND_BY_ID_SUCCESS,
                payload: data
            });
            Notification('success', message);
        } else {
            dispatch({
                type: DELETE_BRAND_BY_ID_ERROR
            });
            Notification('error', message);
        }
    } catch (err) {
        dispatch({
            type: DELETE_BRAND_BY_ID_ERROR
        });
        Notification('error');
    }
};

export const updateBrand = (formData, _id) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_BRAND_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.put(`/brand/${_id}`, formData, {
            headers: headers
        });

        if (status === 200) {
            dispatch({
                type: UPDATE_BRAND_BY_ID_SUCCESS,
                payload: data
            });
            dispatch({
                type: CHANGE_BRAND_MODAL_STATE,
                payload: false
            });
            Notification('success', message);
        } else {
            Notification('error', message);
            dispatch({
                type: UPDATE_BRAND_BY_ID_ERROR
            });
        }
    } catch (err) {
        Notification('error');
        dispatch({
            type: UPDATE_BRAND_BY_ID_ERROR
        });
    }
};
