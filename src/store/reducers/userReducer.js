import {
    ERROR_USER_DETAILS,
    ERROR_USER_LOGIN,
    SUCCESS_USER_DETAILS,
    SUCCESS_USER_LOGIN,
    USER_DETAILS,
    USER_LOGIN,
    GET_CANDIDATES_ERROR,
    GET_CANDIDATES_SUCCESS,
    GET_CANDIDATES,
    GET_CANDIDATES_BY_ID,
    GET_CANDIDATES_BY_ID_ERROR,
    GET_CANDIDATES_BY_ID_SUCCESS,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    ADD_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER
} from 'store/constant';

export const initialState = {
    userDetails: {},
    selectedCandidate: {},
    customers: [],
    loading: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, loading: true };
        case SUCCESS_USER_LOGIN:
            return { ...state, userDetails: action.payload, loading: false };
        case ERROR_USER_LOGIN:
            return { ...state, loading: false };
        case USER_DETAILS:
            return { ...state };
        case SUCCESS_USER_DETAILS:
            return { ...state, userDetails: action.payload };
        case ERROR_USER_DETAILS:
            return { ...state };
        case GET_CANDIDATES:
            return { ...state, loading: true };
        case GET_CANDIDATES_SUCCESS:
            return { ...state, loading: false, customers: action.payload };
        case GET_CANDIDATES_ERROR:
            return { ...state, loading: false };

        case GET_CANDIDATES_BY_ID:
            return { ...state, loading: true, selectedCandidate: {} };
        case GET_CANDIDATES_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedCandidate: action.payload };
        case GET_CANDIDATES_BY_ID_ERROR:
            return { ...state, loading: false };
        case ADD_USER:
            return { ...state, loading: true };
        case ADD_USER_SUCCESS:
            return { ...state, loading: false };
        case ADD_USER_ERROR:
            return { ...state, loading: false };
        case DELETE_USER:
            return { ...state, loading: true };
        case DELETE_USER_SUCCESS:
            return { ...state, loading: false, customers: action.payload };
        case DELETE_USER_ERROR:
            return { ...state, loading: false };

        default:
            return { ...state };
    }
};

export default userReducer;
