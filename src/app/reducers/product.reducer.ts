import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import {
  addProductAction,
  deleteProductAction,
  loadProductsAction,
  loadProductsFailureAction,
  loadProductsSuccessAction,
} from '../actions/product.actions';
import { CartState } from '../states/cart.state';
import { ProductState } from '../states/product.state';
import { cartReducer } from './cart-item.reducer';

const initialState: ProductState = {
  cart: [],
  products: [],
  loading: false,
  error: new Error(undefined),
  count: 0,
};

export const productReducer = createReducer(
  initialState,
  on(addProductAction, (state, { product }) => {
    return {
      ...state,
      cart: [...state.cart, product],
      loading: false,
      count: state.count + 1,
    };
  }),
  on(deleteProductAction, (state, { productId }) => {
    const remainingProducts = state.cart.filter((product) => product.id !== productId);
    return {
      ...state,
      cart: remainingProducts,
      loading: false,
      count: remainingProducts.length,
    };
  }),
  on(loadProductsAction, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(loadProductsSuccessAction, (state, { products }) => {
    return {
      ...state,
      products: products,
      loading: false,
    };
  }),
  on(loadProductsFailureAction, (state, { error }) => {
    return {
      ...state,
      error: error,
      loading: false,
    };
  })
);

export const reducers: ActionReducerMap<AppState> = {
  products: productReducer,
  carts: cartReducer,
};

export interface AppState {
  products: ProductState;
  carts: CartState;
}
