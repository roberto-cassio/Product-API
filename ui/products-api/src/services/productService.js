import api from '@/lib/api.js';

export const fetchProducts = async (page = 0, size= 6) => {
    try {
        const response = await api.get(`/products?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const createProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

export const updateProduct = async (productId, updateProductData) => {
    try {
        const response = await api.put(`/products/${productId}`, updateProductData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
