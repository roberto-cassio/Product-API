import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/'
})

const clearUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

const redirectToLogin = () => {
    window.location.href = '/login';
}

const handleUnauthorizedAccess = () => {
    clearUserSession();
    redirectToLogin();
}

const appendAuthToken = (config, token) => {
    config.headers['Authorization'] = `Bearer ${token}`;
}
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const isAuthenticated = !!token;
        if (isAuthenticated) {
            appendAuthToken(config, token);
        } 
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isTokenExpired = error.response?.status === 401;
        if (isTokenExpired) {
            handleUnauthorizedAccess();
        }
        return Promise.reject(error);
    }
)

export default api;