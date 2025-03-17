import axios from 'axios';

const baseURL = "http://localhost:8088";
const instance = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// You can add interceptors if needed
instance.interceptors.request.use(
    config => {
        // Do something before request is sent
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

const handleRefreshToken = async () => {
    const response = await instance.post('/api/v1/auth/refresh-token');
    console.log("handleRefreshToken", response);
    if(response.data) {
        return response.data.data.access_token;
    }
    else return null;
}

const NO_RETRY_HEADERS = 'x-no-retry';

instance.interceptors.response.use(
    response => {
        // Do something with response data
        return response;
    },
    async error => {
        // Do something with response error
        if (error.config 
            && error.response 
            && error.response.status === 401 
            && !error.config.headers[NO_RETRY_HEADERS]) {
            const newAccessToken = await handleRefreshToken();
            error.config.headers[NO_RETRY_HEADERS] = true;
            if(newAccessToken) {
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                localStorage.setItem('token', newAccessToken);
                return instance.request(error.config);
            }
            else {
                localStorage.removeItem('token');
                window.location.href = '/sign-in';
            }
        }
        return Promise.reject(error);
    }
);

export default instance;