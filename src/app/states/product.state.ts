import { Product } from "../product/product.model";

export interface ProductState {
  cart: Product[],
  products: Product[];
  loading: boolean;
  error: Error;
}
