import { createAction, props } from "@ngrx/store";
import { ProductActionTypes } from "../enums/product.enum";
import { Product } from "../product/product.model";

export const addProductAction = createAction(
  ProductActionTypes.ADD_PRODUCT,
  props<{ product: Product }>()
)

export const deleteProductAction = createAction(
  ProductActionTypes.DELETE_PRODUCT,
  props<{ productId: string }>()
)
