import axios from "../utils/axios-customize";

const token = localStorage.getItem('token');

export const callRegister = async ({ email, password, fullName }) => {
    try {
        const response = await axios.post('/api/v1/auth/sign-up', {
            email,
            password,
            fullName
        });
        return response.data;
    } catch (error) {
        console.error('API callRegister, Error:', error);
        throw error;
    }
};

export const callLogin = async ({ email, password }) => {
    try {
        const response = await axios.post('/api/v1/auth/sign-in', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('API callLogin, Error:', error);
        throw error;
    }
};

export const callLogout = async () => {
    try {
        const response = await axios.post('/api/v1/auth/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('API callLogout, Error', error);
        throw error;
    }
}

export const fetchProfile = async () => {
    try {
        const response = await axios.get('/api/v1/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API fetchProfile, Error:', error);
        throw error;
    }
}