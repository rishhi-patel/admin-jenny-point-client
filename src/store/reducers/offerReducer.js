// project imports
import config from 'config';

// action - state management
import * as actionTypes from '../actions';
import {
    DELETE_OFFER_BY_ID_SUCCESS,
    GET_OFFERS,
    GET_OFFERS_ERROR,
    GET_OFFERS_SUCCESS,
    GET_OFFER_BY_ID,
    GET_OFFER_BY_ID_ERROR,
    GET_OFFER_BY_ID_SUCCESS
} from 'store/constant';

export const initialState = {
    loading: true,
    offers: [],
    selectedOffer: {
        title: '',
        image: {
            key: '',
            url: ''
        },
        validTill: Date.now(),
        offerType: '',
        discountValue: ''
    }
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const offerReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case GET_OFFERS:
            return { ...state, loading: true };
        case GET_OFFERS_SUCCESS:
        case DELETE_OFFER_BY_ID_SUCCESS:
            return { ...state, loading: false, offers: action.payload };
        case GET_OFFERS_ERROR:
            return { ...state, loading: false };
        case GET_OFFER_BY_ID:
            return { ...state, loading: true };
        case GET_OFFER_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedOffer: action.payload };
        case GET_OFFER_BY_ID_ERROR:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default offerReducer;
