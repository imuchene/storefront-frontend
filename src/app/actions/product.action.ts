import { Action } from "@ngrx/store";
import { ProductActionTypes } from "../enums/product.enum";
import { Product } from "../product/product.model";

export class AddProductAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT;

  constructor(public payload: Product){}
}

export class DeleteProductAction implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT;

  constructor(public payload: string){}
}

export type Actions = | AddProductAction | DeleteProductAction