import { axiosInstance } from '../utils/http';

import { CreateProductRequest, Product } from '../types';

export async function getProducts(): Promise<Product[]> {
  return await axiosInstance.get('products');
}

export async function createProduct(
  createProductRequest: CreateProductRequest,
) {
  return await axiosInstance.post('products', createProductRequest);
}

export async function deleteProduct(id: string) {
  return await axiosInstance.delete('products/' + id);
}
