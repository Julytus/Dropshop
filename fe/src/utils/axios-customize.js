import axios from 'axios';

const baseURL = "http://localhost:8088";
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// You can add interceptors if needed
instance.interceptors.request.use(
    config => {
        // Thêm token vào header mỗi khi gửi request
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Flag để kiểm soát quá trình refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

const handleRefreshToken = async () => {
    try {
        const response = await instance.get('/api/v1/auth/refresh-token', {
            headers: { 'x-no-retry': 'true' } // Đảm bảo không retry refresh token
        });
        if(response.data && response.data.access_token) {
            return response.data.access_token;
        }
        return null;
    } catch (error) {
        console.error("Refresh token failed:", error);
        return null;
    }
}

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const originalRequest = error.config;
        
        // Nếu request là đăng nhập và bị lỗi 401, không cần refresh token
        if (originalRequest.url === '/api/v1/auth/sign-in') {
            return Promise.reject(error);
        }
        
        // Nếu lỗi không phải 401 hoặc đã thử refresh token
        if (!error.response || error.response.status !== 401 || originalRequest._retry || originalRequest.headers['x-no-retry']) {
            return Promise.reject(error);
        }
        
        if (isRefreshing) {
            // Nếu đang refresh, thêm request vào hàng đợi
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
            .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return instance(originalRequest);
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
        
        // Đánh dấu request đã được thử refresh
        originalRequest._retry = true;
        isRefreshing = true;
        
        return new Promise((resolve, reject) => {
            handleRefreshToken()
                .then(newToken => {
                    if (newToken) {
                        // Cập nhật token trong localStorage và header
                        localStorage.setItem('token', newToken);
                        instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        
                        // Xử lý queue
                        processQueue(null, newToken);
                        
                        // Thực hiện lại request gốc
                        resolve(instance(originalRequest));
                    } else {
                        // Refresh token thất bại, logout
                        processQueue(error);
                        localStorage.removeItem('token');
                        window.location.href = '/sign-in';
                        reject(error);
                    }
                })
                .catch(err => {
                    processQueue(err);
                    localStorage.removeItem('token');
                    window.location.href = '/sign-in';
                    reject(err);
                })
                .finally(() => {
                    isRefreshing = false;
                });
        });
    }
);

export default instance;