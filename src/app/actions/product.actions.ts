import { createAction, props } from '@ngrx/store';
import { ProductActionTypes } from '../enums/product.enum';
import { Product } from '../models/product.model';

export const addProductAction = createAction(
  ProductActionTypes.ADD_PRODUCT,
  props<{ product: Product; count: number }>()
);

export const deleteProductAction = createAction(ProductActionTypes.DELETE_PRODUCT, props<{ productId: string }>());

export const loadProductsAction = createAction(ProductActionTypes.LOAD_PRODUCTS);

export const loadProductsSuccessAction = createAction(
  ProductActionTypes.LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsFailureAction = createAction(
  ProductActionTypes.LOAD_PRODUCTS_FAILURE,
  props<{ error: Error }>()
);

export const resetCartAction = createAction(
  ProductActionTypes.RESET_CART
);
