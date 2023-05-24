import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
// const baseUrl = 'http://localhost:8080/api/v1';

export default axios.create({
    baseURL: baseUrl,
    timeout: 30000, // 30 secs
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    },
    validateStatus: (status) => {
        if (status === 401) {
            window.location.href = '/';
            localStorage.clear();
        }
        return status;
    }
});
