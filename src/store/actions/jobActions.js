import API from 'API';
import {
    GET_JOBS,
    GET_JOBS_ERROR,
    GET_JOBS_SUCCESS,
    GET_JOB_BY_ID,
    GET_JOB_BY_ID_ERROR,
    GET_JOB_BY_ID_SUCCESS,
    UPDATE_JOB,
    UPDATE_JOB_ERROR,
    UPDATE_JOB_SUCCESS,
    DELETE_JOB,
    DELETE_JOB_ERROR,
    DELETE_JOB_SUCCESS,
    CREATE_JOB_SUCCESS,
    CREATE_JOB,
    CREATE_JOB_ERROR
} from 'store/constant';
import Notification from 'utils/Notification';

export const getJobs = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_JOBS
        });
        const {
            data: { data, message },
            status
        } = await API.get('/job');

        if (status === 200) {
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
            dispatch({
                type: GET_JOBS_ERROR
            });
        }
    } catch (error) {
        Notification('error');
        dispatch({
            type: GET_JOBS_ERROR
        });
    }
};

export const createJob = (jobDetails, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_JOB
        });
        const {
            data: { data, message },
            status
        } = await API.post(`/job`, jobDetails);

        if (status === 200) {
            dispatch({
                type: CREATE_JOB_SUCCESS,
                payload: data
            });
            Notification('success', message);
            navigate('/dashboard/jobs');
        } else {
            Notification('error', message);
            dispatch({
                type: CREATE_JOB_ERROR
            });
        }
    } catch ({ message }) {
        Notification('error', message);
        dispatch({
            type: CREATE_JOB_ERROR
        });
    }
};

export const getJobById = (_id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_JOB_BY_ID
        });
        const {
            data: { data, message },
            status
        } = await API.get(`/job/${_id}`);

        if (status === 200) {
            dispatch({
                type: GET_JOB_BY_ID_SUCCESS,
                payload: data
            });
        } else {
            Notification('error', message);
            dispatch({
                type: GET_JOB_BY_ID_ERROR
            });
        }
    } catch (error) {
        Notification('error');
        dispatch({
            type: GET_JOB_BY_ID_ERROR
        });
    }
};

export const updateJobById = (jobDetails, navigate) => async (dispatch) => {
    const { _id } = jobDetails;
    try {
        dispatch({
            type: UPDATE_JOB
        });
        const {
            data: { data, message },
            status
        } = await API.put(`/job/${_id}`, jobDetails);

        if (status === 200) {
            dispatch({
                type: UPDATE_JOB_SUCCESS,
                payload: data
            });
            Notification('success', message);
            navigate('/dashboard/jobs');
        } else {
            Notification('error', message);
            dispatch({
                type: UPDATE_JOB_ERROR
            });
        }
    } catch ({ message }) {
        Notification('error', message);
        dispatch({
            type: UPDATE_JOB_ERROR
        });
    }
};

export const deleteJobById = (_id, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_JOB
        });
        const {
            data: { message },
            status
        } = await API.delete(`/job/${_id}`);

        if (status === 200) {
            dispatch({
                type: DELETE_JOB_SUCCESS
            });
            Notification('success', message);
            navigate('/dashboard/jobs');
        } else {
            Notification('error', message);
            dispatch({
                type: DELETE_JOB_ERROR
            });
        }
    } catch ({ message }) {
        Notification('error', message);
        dispatch({
            type: DELETE_JOB_ERROR
        });
    }
};
