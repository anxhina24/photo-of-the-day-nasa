import axios, { AxiosInstance } from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3001',
    headers: {
        'withCredentials': 'false',
    },
});

export default api;
