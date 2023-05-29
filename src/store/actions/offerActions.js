import API from 'API';
import {
    DELETE_OFFER_BY_ID_SUCCESS,
    GET_OFFERS,
    GET_OFFERS_ERROR,
    GET_OFFERS_SUCCESS,
    GET_OFFER_BY_ID,
    GET_OFFER_BY_ID_ERROR,
    GET_OFFER_BY_ID_SUCCESS
} from 'store/constant';
import Notification from 'utils/Notification';

export const getOffers = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_OFFERS
        });
        const {
            data: { data, message },
            status
        } = await API.get(`/offer`);
        if (status === 200) {
            dispatch({
                type: GET_OFFERS_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
            dispatch({
                type: GET_OFFERS_ERROR
            });
        }
    } catch (error) {
        dispatch({
            type: GET_OFFERS_ERROR
        });
    }
};

export const getOfferByID = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_OFFER_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.get(`/offer/${id}`);

        if (status === 200) {
            dispatch({
                type: GET_OFFER_BY_ID_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
            dispatch({
                type: GET_OFFER_BY_ID_ERROR
            });
        }
    } catch (error) {
        dispatch({
            type: GET_OFFER_BY_ID_ERROR
        });
    }
};
export const createOffer = (offerData, navigate) => async (dispatch) => {
    try {
        const {
            data: { data, message },
            status
        } = await API.post(`/offer`, offerData);
        if (status === 200) {
            navigate(-1);
        } else {
            Notification('error', message);
        }
    } catch ({ message }) {
        Notification('error', message);
    }
};

export const deleteOffer = (_id) => async (dispatch) => {
    try {
        const {
            data: { data, message },
            status
        } = await API.delete(`/offer/${_id}`);
        if (status === 200) {
            Notification('success', message);
            dispatch({
                type: DELETE_OFFER_BY_ID_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
        }
    } catch ({ message }) {
        Notification('error', message);
    }
};
export const updateOffer = (offerData, navigate) => async (dispatch) => {
    try {
        const { _id } = offerData;
        const {
            data: { data, message },
            status
        } = await API.put(`/offer/${_id}`, offerData);
        if (status === 200) {
            Notification('success', message);
            navigate(-1);
        } else {
            Notification('error', message);
        }
    } catch ({ message }) {
        Notification('error', message);
    }
};
