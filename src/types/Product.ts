export interface Product {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl?: string;
}

export interface UpdateProductRequest {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
    imageUrl?: string;
}

export interface ProductResponse {
    success: boolean;
    data?: Product;
    message?: string;
}

export interface ProductsResponse {
    success: boolean;
    data?: Product[];
    message?: string;
} 