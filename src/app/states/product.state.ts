import { Product } from '../models/product.model';

export interface ProductState {
  cart: Product[];
  products: Product[];
  loading: boolean;
  error: Error;
  count: number;
}
