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
    CHANGE_SELECTED_CATEGORY,
    CHANGE_SUB_CATEGORY_MODAL_STATE,
    CREATE_SUB_CATEGORY,
    CREATE_SUB_CATEGORY_ERROR,
    CREATE_SUB_CATEGORY_SUCCESS,
    GET_SUB_CATEGORIES,
    GET_SUB_CATEGORIES_ERROR,
    GET_SUB_CATEGORIES_SUCCESS,
    DELETE_SUB_CATEGORY_BY_ID,
    DELETE_SUB_CATEGORY_BY_ID_ERROR,
    DELETE_SUB_CATEGORY_BY_ID_SUCCESS,
    UPDATE_SUB_CATEGORY_BY_ID,
    UPDATE_SUB_CATEGORY_BY_ID_ERROR,
    UPDATE_SUB_CATEGORY_BY_ID_SUCCESS,
    CHANGE_SELECTED_SUB_CATEGORY
} from 'store/constant';

export const initialState = {
    categories: [],
    categoryModalState: false,
    selectedCategory: null,

    mainCategory: { subCategory: [] },
    subCategoryModalState: false,
    selectedSubCategory: null,

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
            return { ...state, categories: [action.payload, ...state.categories], selectedCategory: null };
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
            return { ...state, categories: action.payload, selectedCategory: null };
        case CHANGE_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload, categoryModalState: !state.categoryModalState };
        //sub
        case CHANGE_SUB_CATEGORY_MODAL_STATE:
            return { ...state, subCategoryModalState: action.payload };
        case GET_SUB_CATEGORIES:
            return { ...state, loading: true };
        case GET_SUB_CATEGORIES_SUCCESS:
            return { ...state, loading: false, mainCategory: action.payload };
        case GET_SUB_CATEGORIES_ERROR:
            return { ...state, loading: false };
        case CREATE_SUB_CATEGORY:
            return { ...state };
        case CREATE_SUB_CATEGORY_ERROR:
            return { ...state };
        case CREATE_SUB_CATEGORY_SUCCESS:
            return { ...state, mainCategory: action.payload, selectedSubCategory: null };
        case DELETE_SUB_CATEGORY_BY_ID:
            return { ...state, loading: true };
        case DELETE_SUB_CATEGORY_BY_ID_ERROR:
            return { ...state, loading: false };
        case DELETE_SUB_CATEGORY_BY_ID_SUCCESS:
            return { ...state, loading: false, mainCategory: action.payload };
        case UPDATE_SUB_CATEGORY_BY_ID:
            return { ...state };
        case UPDATE_SUB_CATEGORY_BY_ID_ERROR:
            return { ...state };
        case UPDATE_SUB_CATEGORY_BY_ID_SUCCESS:
            return { ...state, mainCategory: action.payload, selectedSubCategory: null };
        case CHANGE_SELECTED_SUB_CATEGORY:
            return { ...state, selectedSubCategory: action.payload, subCategoryModalState: !state.subCategoryModalState };
        default:
            return { ...state };
    }
};
export default categoryReducer;
