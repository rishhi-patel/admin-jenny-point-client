import {
    CHANGE_PRODUCT_MODAL_STATE,
    CREATE_PRODUCT,
    CREATE_PRODUCT_ERROR,
    CREATE_PRODUCT_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS,
    DELETE_PRODUCT_BY_ID,
    DELETE_PRODUCT_BY_ID_ERROR,
    DELETE_PRODUCT_BY_ID_SUCCESS,
    UPDATE_PRODUCT_BY_ID,
    UPDATE_PRODUCT_BY_ID_ERROR,
    UPDATE_PRODUCT_BY_ID_SUCCESS,
    GET_PRODUCT_BY_ID,
    GET_PRODUCT_BY_ID_SUCCESS
} from 'store/constant';

export const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, loading: true };
        case GET_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case GET_PRODUCTS_ERROR:
            return { ...state, loading: false };
        case CREATE_PRODUCT:
            return { ...state };
        case CREATE_PRODUCT_ERROR:
            return { ...state };
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, products: [action.payload, ...state.products] };
        case DELETE_PRODUCT_BY_ID:
            return { ...state, loading: true };
        case DELETE_PRODUCT_BY_ID_ERROR:
            return { ...state, loading: false };
        case DELETE_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case UPDATE_PRODUCT_BY_ID:
            return { ...state };
        case UPDATE_PRODUCT_BY_ID_ERROR:
            return { ...state };
        case UPDATE_PRODUCT_BY_ID_SUCCESS:
            return { ...state, products: action.payload };
        case GET_PRODUCT_BY_ID:
            return { ...state, loading: true, selectedProduct: {} };
        case GET_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedProduct: action.payload };
        case GET_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false };
        default:
            return { ...state };
    }
};
export default productReducer;
