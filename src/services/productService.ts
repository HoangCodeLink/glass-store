import * as api from "../api";
import { Product, ProductFilter } from "../types";

export const getProducts = async (filter: ProductFilter) => {
    const response = await api.get<Product[]>('/products', filter);
    return response.data;
}

export const getProduct = async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
}

export const createProduct = async (product: Product) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
}