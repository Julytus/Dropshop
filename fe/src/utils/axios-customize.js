import axios from 'axios';
import { store } from '../redux/store';
import { doLogoutAction } from '../redux/account/accountSlice';
import { toast } from 'react-toastify';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8088',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Flag để kiểm tra xem đang refresh token hay không
let isRefreshing = false;
// Mảng chứa các request đang chờ refresh token
let failedQueue = [];

const processQueue = (error = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

const handleRefreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await instance.post('/api/v1/auth/refresh-token', { refresh_token: refreshToken });
        
        if (response.data) {
            const { access_token, refresh_token } = response.data.data;
            localStorage.setItem('token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            return access_token;
        }
        return null;
    } catch (error) {
        console.error('Refresh token failed:', error);
        // Xóa token và chuyển về trang login
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        store.dispatch(doLogoutAction());
        window.location.href = '/sign-in';
        throw error;
    }
};

instance.interceptors.request.use(function (config) {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
        // Kiểm tra nếu đây là request đăng nhập thì không refresh token
        if (originalRequest.url === '/api/v1/auth/sign-in') {
            return Promise.reject(error);
        }
        
        // Chỉ refresh token cho các request fetchProfile (/api/v1/user)
        // if (originalRequest.url !== '/api/v1/user') {
        //     return Promise.reject(error);
        // }
        
        if (isRefreshing) {
            // Nếu đang refresh token, thêm request vào hàng đợi
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => {
                    return instance(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const newToken = await handleRefreshToken();
            if (newToken) {
                processQueue();
                return instance(originalRequest);
            }
        } catch (refreshError) {
            processQueue(refreshError);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }

    // Xử lý các lỗi khác
    if (error.response?.status === 403) {
        toast.error('You do not have permission to access this resource');
    } else if (error.response?.status === 404) {
        toast.error('Resource not found');
    } else if (error.response?.status === 500) {
        toast.error('Server error occurred');
    } else {
        toast.error('An error occurred');
    }

    return Promise.reject(error);
});

export default instance;