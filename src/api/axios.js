import axios from 'axios';

const baseURL =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_BACKEND_URL + '/api' // Use backend URL in production
        : 'http://localhost:5000/api'; // Use localhost in development

const API = axios.create({
    baseURL,
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access - redirecting to login.');
        }
        return Promise.reject(error);
    }
);

export default API;