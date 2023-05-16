import API from 'API';
import {
    ERROR_USER_DETAILS,
    ERROR_USER_LOGIN,
    GET_CANDIDATES,
    GET_CANDIDATES_BY_ID,
    GET_CANDIDATES_BY_ID_ERROR,
    GET_CANDIDATES_BY_ID_SUCCESS,
    GET_CANDIDATES_ERROR,
    GET_CANDIDATES_SUCCESS,
    SUCCESS_USER_DETAILS,
    SUCCESS_USER_LOGIN,
    USER_DETAILS,
    USER_LOGIN
} from 'store/constant';
import Notification from 'utils/Notification';

export const authUser = (value, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN
        });
        const { data, status } = await API.post('/user/login', {
            ...value
        });
        if (status === 200) {
            const {
                data: { token, user },
                message
            } = data;
            Notification('success', message);
            dispatch({
                type: SUCCESS_USER_LOGIN,
                payload: user
            });
            localStorage.setItem('auth_token', token);
            setTimeout(() => {
                window.location.href = '/dashboard/customers';
            }, 500);
        } else {
            dispatch({
                type: ERROR_USER_LOGIN
            });
            Notification('error', data.message);
        }
    } catch (error) {
        dispatch({
            type: ERROR_USER_LOGIN
        });
    }
};

export const getUserDetails = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS
        });
        const { data, status } = await API.get('/user/profile');
        if (status === 200) {
            const { data: userDetails, message } = data;
            dispatch({
                type: SUCCESS_USER_DETAILS,
                payload: userDetails
            });
        }
    } catch (error) {
        dispatch({
            type: ERROR_USER_DETAILS
        });
    }
};

export const getCustomer = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CANDIDATES
        });
        const { data, status } = await API.get('/user');

        if (status === 200) {
            const { data: customers } = data;
            dispatch({
                type: GET_CANDIDATES_SUCCESS,
                payload: customers
            });
        } else {
            Notification('error');
            dispatch({
                type: GET_CANDIDATES_ERROR
            });
        }
    } catch (error) {
        dispatch({
            type: GET_CANDIDATES_ERROR
        });
    }
};

export const getCandidateById = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CANDIDATES_BY_ID
        });
        const { data, status } = await API.get(`/user/${_id}`);

        if (status === 200) {
            const { data: customer } = data;
            dispatch({
                type: GET_CANDIDATES_BY_ID_SUCCESS,
                payload: customer
            });
        } else {
            Notification('error');
            dispatch({
                type: GET_CANDIDATES_BY_ID_ERROR
            });
        }
    } catch (error) {
        dispatch({
            type: GET_CANDIDATES_BY_ID_ERROR
        });
    }
};

export const generateOTP = (mobileNo) => async (dispatch) => {
    try {
        const {
            data: { message },
            status
        } = await API.post(`/user/login`, { mobileNo });

        if (status === 200) {
            Notification('success', message);
        } else {
            Notification('error', message);
        }
    } catch (error) {
        Notification('error');
    }
};

export const verifyOTP = (userData, navigate) => async (dispatch) => {
    try {
        const {
            data: { message, data },
            status
        } = await API.post(`/user/verify-admin`, userData);
        if (status === 200) {
            const { token } = data;
            Notification('success', message);
            localStorage.setItem('auth_token', token);
            setTimeout(() => {
                window.location.href = '/dashboard/customers';
            }, 500);
            // navigate(`/dashboard/category`);
        } else {
            Notification('error', message);
        }
    } catch ({ message }) {
        Notification('error', message);
    }
};

export const resetPassword = (userDetails, navigate) => async (dispatch) => {
    try {
        const { token, password } = userDetails;
        const {
            data: { message },
            status
        } = await API.post(`/user/password/${token}`, { password });
        if (status === 200) {
            Notification('success', message);
            navigate(`/`);
        } else {
            Notification('error', message);
        }
    } catch (error) {
        Notification('error');
    }
};

export const blockCandidate =
    ({ _id, isBlocked }) =>
    async () => {
        try {
            const {
                data: { message },
                status
            } = await API.patch(`/customer/${_id}/block`, { isBlocked });
            if (status === 200) {
                Notification('success', message);
            } else {
                Notification('error', message);
            }
        } catch ({ message }) {
            Notification('error', message);
        }
    };

export const updateCandidateDetails = (_id, customerDetails, navigate) => async () => {
    try {
        const {
            data: { message },
            status
        } = await API.put(`/customer/${_id}`, customerDetails);
        if (status === 200) {
            Notification('success', message);
            navigate('/dashboard/customers');
        } else {
            Notification('error', message);
        }
    } catch ({ message }) {
        Notification('error', message);
    }
};
