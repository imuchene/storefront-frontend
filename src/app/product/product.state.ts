import { Product } from "./product.model";

export interface ProductState {
  cart: Product[],
  products: Product[];
  loading: boolean;
  error: Error;
}
