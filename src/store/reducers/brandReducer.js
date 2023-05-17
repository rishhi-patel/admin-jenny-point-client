import {
    CHANGE_BRAND_MODAL_STATE,
    CREATE_BRAND,
    CREATE_BRAND_ERROR,
    CREATE_BRAND_SUCCESS,
    GET_BRANDS,
    GET_BRANDS_ERROR,
    GET_BRANDS_SUCCESS,
    DELETE_BRAND_BY_ID,
    DELETE_BRAND_BY_ID_ERROR,
    DELETE_BRAND_BY_ID_SUCCESS,
    UPDATE_BRAND_BY_ID,
    UPDATE_BRAND_BY_ID_ERROR,
    UPDATE_BRAND_BY_ID_SUCCESS,
    CHANGE_SELECTED_BRAND
} from 'store/constant';

export const initialState = {
    brands: [],
    brandModalState: false,
    selectedBrand: null,
    loading: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const brandReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BRAND_MODAL_STATE:
            return { ...state, brandModalState: action.payload };
        case GET_BRANDS:
            return { ...state, loading: true };
        case GET_BRANDS_SUCCESS:
            return { ...state, loading: false, brands: action.payload };
        case GET_BRANDS_ERROR:
            return { ...state, loading: false };
        case CREATE_BRAND:
            return { ...state };
        case CREATE_BRAND_ERROR:
            return { ...state };
        case CREATE_BRAND_SUCCESS:
            return { ...state, brands: [action.payload, ...state.brands], selectedBrand: null };
        case DELETE_BRAND_BY_ID:
            return { ...state, loading: true };
        case DELETE_BRAND_BY_ID_ERROR:
            return { ...state, loading: false };
        case DELETE_BRAND_BY_ID_SUCCESS:
            return { ...state, loading: false, brands: action.payload };
        case UPDATE_BRAND_BY_ID:
            return { ...state };
        case UPDATE_BRAND_BY_ID_ERROR:
            return { ...state };
        case UPDATE_BRAND_BY_ID_SUCCESS:
            return { ...state, brands: action.payload, selectedBrand: null };
        case CHANGE_SELECTED_BRAND:
            return { ...state, selectedBrand: action.payload, brandModalState: !state.brandModalState };
        default:
            return { ...state };
    }
};
export default brandReducer;
