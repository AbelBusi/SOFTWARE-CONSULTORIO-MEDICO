import axios from 'axios';
import { refrescarToken } from '../features/auth/services/authService';

const api = axios.create({
    baseURL: 'http://localhost:8088/api/v1',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) throw new Error('No hay refresh token disponible');

                const tokens = await refrescarToken(refreshToken);

                localStorage.setItem('access_token', tokens.access_token);
                localStorage.setItem('refresh_token', tokens.refresh_token);

                originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;