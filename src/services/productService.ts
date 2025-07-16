import api from './api';
import { Product, CreateProductRequest, UpdateProductRequest, ProductResponse, ProductsResponse } from '../types/Product';

export const productService = {
    // Get all products
    async getAllProducts(): Promise<Product[]> {
        try {
            const response = await api.get<ProductsResponse>('/products');
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Get product by ID
    async getProductById(id: string): Promise<Product> {
        try {
            const response = await api.get<ProductResponse>(`/products/${id}`);
            if (!response.data.data) {
                throw new Error('Product not found');
            }
            return response.data.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    // Create new product
    async createProduct(productData: CreateProductRequest): Promise<Product> {
        try {
            const response = await api.post<ProductResponse>('/products', productData);
            if (!response.data.data) {
                throw new Error('Failed to create product');
            }
            return response.data.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    // Update product
    async updateProduct(id: string, productData: UpdateProductRequest): Promise<Product> {
        try {
            const response = await api.put<ProductResponse>(`/products/${id}`, productData);
            if (!response.data.data) {
                throw new Error('Failed to update product');
            }
            return response.data.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    // Delete product
    async deleteProduct(id: string): Promise<void> {
        try {
            await api.delete(`/products/${id}`);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    },

    // Search products by category
    async getProductsByCategory(category: string): Promise<Product[]> {
        try {
            const response = await api.get<ProductsResponse>(`/products/category/${category}`);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching products by category:', error);
            throw error;
        }
    },

    // Search products by name
    async searchProducts(query: string): Promise<Product[]> {
        try {
            const response = await api.get<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
            return response.data.data || [];
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
}; 