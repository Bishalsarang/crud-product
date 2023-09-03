import { z } from 'zod';

import {
  createProductRequestSchema,
  productSchema,
} from './schema/productSchema';

export type Product = z.infer<typeof productSchema>;
export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;
