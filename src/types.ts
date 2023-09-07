import { z } from 'zod';

import {
  createProductRequestSchema,
  productSchema,
} from './schema/productSchema';

export type Product = z.infer<typeof productSchema>;
export type IdParams = {
  id: string;
};

export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;

export interface CreateProductRequestDTO {
  product: CreateProductRequest;
  base64ImageString: string;
  filename: string;
}
