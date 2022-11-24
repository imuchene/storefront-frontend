import { createReducer, on } from "@ngrx/store";
import { addProductAction, deleteProductAction } from "../actions/product.actions";
import { Product } from "../product/product.model";

const initialState: Product[] = [];

export const productReducer = createReducer(initialState,
  on(addProductAction, (state, { product}) => {
    return [...state, product]
  }),
  on(deleteProductAction, (state, { productId }) => {
    return state.filter(product => product.id !== productId);
  })
)