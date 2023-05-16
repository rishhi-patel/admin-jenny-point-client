import {
    CHANGE_CATEGORY_MODAL_STATE,
    CREATE_CATEGORY,
    CREATE_CATEGORY_ERROR,
    CREATE_CATEGORY_SUCCESS,
    GET_CATEGORIES,
    GET_CATEGORIES_ERROR,
    GET_CATEGORIES_SUCCESS,
    DELETE_CATEGORY_BY_ID,
    DELETE_CATEGORY_BY_ID_ERROR,
    DELETE_CATEGORY_BY_ID_SUCCESS,
    UPDATE_CATEGORY_BY_ID,
    UPDATE_CATEGORY_BY_ID_ERROR,
    UPDATE_CATEGORY_BY_ID_SUCCESS,
    CHANGE_SELECTED_CATEGORY
} from 'store/constant';

export const initialState = {
    categories: [],
    categoryModalState: false,
    selectedCategory: null,
    loading: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY_MODAL_STATE:
            return { ...state, categoryModalState: action.payload };
        case GET_CATEGORIES:
            return { ...state, loading: true };
        case GET_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case GET_CATEGORIES_ERROR:
            return { ...state, loading: false };
        case CREATE_CATEGORY:
            return { ...state };
        case CREATE_CATEGORY_ERROR:
            return { ...state };
        case CREATE_CATEGORY_SUCCESS:
            return { ...state, categories: [action.payload, ...state.categories] };
        case DELETE_CATEGORY_BY_ID:
            return { ...state, loading: true };
        case DELETE_CATEGORY_BY_ID_ERROR:
            return { ...state, loading: false };
        case DELETE_CATEGORY_BY_ID_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case UPDATE_CATEGORY_BY_ID:
            return { ...state };
        case UPDATE_CATEGORY_BY_ID_ERROR:
            return { ...state };
        case UPDATE_CATEGORY_BY_ID_SUCCESS:
            return { ...state, categories: action.payload };
        case CHANGE_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload, categoryModalState: !state.categoryModalState };
        default:
            return { ...state };
    }
};
export default categoryReducer;
