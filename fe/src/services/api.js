import axios from "../utils/axios-customize";

//Auth
export const callRegister = async ({ email, password, fullName }) => {
    try {
        const response = await axios.post('/api/v1/auth/sign-up', {
            email,
            password,
            full_name: fullName
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API fetchProfile, Error:', error);
        throw error;
    }
}

//product
export const createProduct = async (productData, primaryImage) => {
    try {
        console.log("Frontend productData:", productData);
        
        // Tạo FormData object để gửi cả file và dữ liệu
        const formData = new FormData();
        
        // Gửi file ảnh dưới tên primaryImage, phù hợp với tên trường trong ProductRequest
        formData.append('primaryImage', primaryImage);
        
        // Gửi dữ liệu dưới dạng form fields riêng lẻ
        formData.append('name', productData.name);
        formData.append('categoryId', productData.categoryId);
        // Đảm bảo price là số
        formData.append('price', productData.price.toString());

        const response = await axios.post('/api/v1/product', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API createProduct, Error:', error);
        // Hiển thị thêm chi tiết lỗi từ server nếu có
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        }
        throw error;
    }
}

export const fetchProducts = async (params = {}) => {
    try {
        // Đảm bảo có giá trị mặc định cho page và limit
        const queryParams = {
            page: params.page || 1,
            limit: params.limit || 20,
            ...params
        };
        
        const response = await axios.get('/api/v1/product', {
            params: queryParams,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API fetchProducts, Error:', error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        // Make DELETE request to delete product
        const response = await axios.delete(`/api/v1/product/${productId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        // Log success for debugging
        console.log("Product deleted successfully:", productId);
        
        return response.data;
    } catch (error) {
        console.error('API deleteProduct, Error:', error);
        // Display additional error details from server if available
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        }
        throw error;
    }
}