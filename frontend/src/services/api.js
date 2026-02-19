import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
    const publicUrls = ['/api/auth/login', '/uptime'];
    const isPublic = publicUrls.some(url => config.url.includes(url));
    if (!isPublic) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isLoginRequest = error.config.url.includes('/api/auth/login');

        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if (!isLoginRequest) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                const base = import.meta.env.BASE_URL || '/site-orcamento-tcs/';
                if (!window.location.hash.includes('/login')) {
                    window.location.href = `${base}#/login`.replace(/\/+/g, '/');
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;