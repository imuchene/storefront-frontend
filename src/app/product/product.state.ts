import { Product } from "./product.model";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: Error;
}