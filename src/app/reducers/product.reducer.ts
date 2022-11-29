import { createReducer, on } from "@ngrx/store";
import { addProductAction, deleteProductAction, loadProductsAction, loadProductsFailureAction, loadProductsSuccessAction } from "../actions/product.actions";
import { ProductState } from "../product/product.state";

const initialState: ProductState = {
  cart: [],
  products: [],
  loading: false,
  error: new Error(undefined)
}

export const productReducer = createReducer(initialState,
  on(addProductAction, (state, { product}) => {
    return { ...state, cart: [...state.cart, product], loading: false}
  }),
  on(deleteProductAction, (state, { productId }) => {
    return {...state, cart: state.cart.filter(product => product.id !== productId), loading: false };
  }),
  on(loadProductsAction, (state) => {
    return {
      ...state,
      loading: true
    }
  }),
  on(loadProductsSuccessAction, (state, { products}) => {
    return {
      ...state,
      products: products,
      loading: false
    }
  }),
  on(loadProductsFailureAction, (state, { error }) => {
    return {
      ...state,
      error: error,
      loading: false,
    }
  })
)