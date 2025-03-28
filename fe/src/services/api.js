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
        const token = localStorage.getItem('token');
        const response = await axios.post('/api/v1/auth/logout', {
            accessToken: token
        }, {
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
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
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

export const createProductDetail = async (productId, productDetailData) => {
    try {
        console.log("Creating product detail for productId:", productId, productDetailData);
        
        // Create FormData object to send both files and data
        const formData = new FormData();
        
        // Add array data for colorIds and sizeIds
        if (productDetailData.colorIds && productDetailData.colorIds.length > 0) {
            productDetailData.colorIds.forEach(colorId => {
                formData.append('colorIds', colorId);
            });
        }
        
        if (productDetailData.sizeIds && productDetailData.sizeIds.length > 0) {
            productDetailData.sizeIds.forEach(sizeId => {
                formData.append('sizeIds', sizeId);
            });
        }
        
        // Add description
        if (productDetailData.description) {
            formData.append('description', productDetailData.description);
        }
        
        // Add thumbnail images if provided
        if (productDetailData.thumbnails && productDetailData.thumbnails.length > 0) {
            productDetailData.thumbnails.forEach(thumbnail => {
                formData.append('thumbnails', thumbnail);
            });
        }
        
        // Log data before sending to check
        console.log("ProductDetail FormData content:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.post(`/api/v1/product-detail/${productId}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API createProductDetail, Error:', error);
        // Display additional error details from server if available
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        }
        throw error;
    }
}

export const fetchProductDetail = async (productId) => {
    try {
        const response = await axios.get(`/api/v1/product-detail/${productId}`);
        return response.data;
    } catch (error) {
        console.error('API fetchProductDetail, Error:', error);
        // Display additional error details from server if available
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        }
        throw error;
    }
}

export const updateProductDetail = async (productId, productDetailData) => {
    try {
        console.log("Updating product detail for productId:", productId, productDetailData);
        
        // Create FormData object to send both files and data
        const formData = new FormData();
        
        // Add array data for colorIds and sizeIds
        if (productDetailData.colorIds && productDetailData.colorIds.length > 0) {
            productDetailData.colorIds.forEach(colorId => {
                formData.append('colorIds', colorId);
            });
        }
        
        if (productDetailData.sizeIds && productDetailData.sizeIds.length > 0) {
            productDetailData.sizeIds.forEach(sizeId => {
                formData.append('sizeIds', sizeId);
            });
        }
        
        // Add description
        if (productDetailData.description) {
            formData.append('description', productDetailData.description);
        }
        
        // Add new thumbnail images if provided
        if (productDetailData.thumbnails && productDetailData.thumbnails.length > 0) {
            productDetailData.thumbnails.forEach(thumbnail => {
                formData.append('thumbnails', thumbnail);
            });
        }
        
        // Log data before sending to check
        console.log("ProductDetail Update FormData content:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        const response = await axios.put(`/api/v1/product-detail/${productId}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API updateProductDetail, Error:', error);
        // Display additional error details from server if available
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        }
        throw error;
    }
}

export const getAllProducts = async (page = 1, limit = 8) => {
    try {
        const response = await axios.get('/api/v1/product', {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('API getAllProducts, Error:', error);
        throw error;
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`/api/v1/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('API getProductById, Error:', error);
        if (error.response) {
            console.error('Server response:', error.response.data);
            console.error('Status code:', error.response.status);
        }
        throw error;
    }
}

//Order
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post('/api/v1/order', orderData);
        return response.data;
    } catch (error) {
        console.error('API createOrder, Error:', error);
        throw error;
    }
};

export const getMyOrders = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get('/api/v1/order', {
            params: {
                page,
                limit
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API getMyOrders, Error:', error);
        throw error;
    }
};

export const getOrderDetail = async (orderId) => {
    try {
        const response = await axios.get(`/api/v1/order/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API getOrderDetail, Error:', error);
        throw error;
    }
};

//Category
export const getAllCategories = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get('/api/v1/category/all', {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('API getAllCategories, Error:', error);
        throw error;
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(`/api/v1/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('API getCategoryById, Error:', error);
        throw error;
    }
}

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post('/api/v1/category', categoryData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API createCategory, Error:', error);
        throw error;
    }
}

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await axios.put(`/api/v1/category/${categoryId}`, categoryData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API updateCategory, Error:', error);
        throw error;
    }
}

//Color
export const getAllColors = async (page = 1, limit = 50) => {
    try {
        const response = await axios.get('/api/v1/color/all', {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('API getAllColors, Error:', error);
        throw error;
    }
}

export const getColorByName = async (name) => {
    try {
        const response = await axios.get(`/api/v1/color/${name}`);
        return response.data;
    } catch (error) {
        console.error('API getColorByName, Error:', error);
        throw error;
    }
}

export const createColor = async (colorData) => {
    try {
        const response = await axios.post('/api/v1/color', colorData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API createColor, Error:', error);
        throw error;
    }
}

export const updateColor = async (id, colorData) => {
    try {
        const response = await axios.put(`/api/v1/color/${id}`, colorData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API updateColor, Error:', error);
        throw error;
    }
}

//Size
export const getAllSizes = async (page = 1, limit = 50) => {
    try {
        const response = await axios.get('/api/v1/size/all', {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.error('API getAllSizes, Error:', error);
        throw error;
    }
}

export const getSizeByName = async (name) => {
    try {
        const response = await axios.get(`/api/v1/size/${name}`);
        return response.data;
    } catch (error) {
        console.error('API getSizeByName, Error:', error);
        throw error;
    }
}

export const createSize = async (sizeData) => {
    try {
        const response = await axios.post('/api/v1/size', sizeData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API createSize, Error:', error);
        throw error;
    }
}

export const updateSize = async (id, sizeData) => {
    try {
        const response = await axios.put(`/api/v1/size/${id}`, sizeData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API updateSize, Error:', error);
        throw error;
    }
} 