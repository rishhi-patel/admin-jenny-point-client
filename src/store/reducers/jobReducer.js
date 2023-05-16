import { GET_JOBS, GET_JOBS_ERROR, GET_JOBS_SUCCESS, GET_JOB_BY_ID, GET_JOB_BY_ID_ERROR, GET_JOB_BY_ID_SUCCESS } from 'store/constant';

export const initialState = {
    jobList: [], // for active default menu
    selectedJob: {},
    loading: false
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOBS:
            return { ...state, loading: true };
        case GET_JOBS_SUCCESS:
            return { ...state, loading: false, jobList: action.payload };
        case GET_JOBS_ERROR:
            return { ...state, loading: false };
        case GET_JOB_BY_ID:
            return { ...state, loading: true };
        case GET_JOB_BY_ID_ERROR:
            return { ...state, loading: false };
        case GET_JOB_BY_ID_SUCCESS:
            return { ...state, loading: false, selectedJob: action.payload };
        default:
            return state;
    }
};

export default jobReducer;
