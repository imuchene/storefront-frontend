import { Action } from "@ngrx/store";
import { Product } from "../product/product.model";


export enum ProductActionTypes {
  ADD_PRODUCT = '[Product] ADD PRODUCT',
  DELETE_PRODUCT = '[Product] DELETE PRODUCT'
}

export class AddProductAction implements Action {
  readonly type = ProductActionTypes.ADD_PRODUCT;

  constructor(public payload: Product){}
}

export class DeleteItemAction implements Action {
  readonly type = ProductActionTypes.DELETE_PRODUCT;

  constructor(public payload: string){}
}

export type Actions = | AddProductAction | DeleteItemAction


export function addProductReducer (state: Product[] = [], action: Actions): Product[] {
  switch (action.type) {
    case ProductActionTypes.ADD_PRODUCT:
      return [...state, action.payload];
    case ProductActionTypes.DELETE_PRODUCT:
      return state.filter(product => product.id !== action.payload);
  
    default:
      return state;
  }
}