import { mockProducts } from '@/data/products';
import type { Product } from '@/types';

declare global {
  var _products: Product[] | undefined;
}

export const products: Product[] = global._products || [...mockProducts];

if (process.env.NODE_ENV !== 'production') {
  global._products = products;
}
