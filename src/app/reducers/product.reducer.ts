import { Actions } from "../actions/product.action";
import { ProductActionTypes } from "../enums/product.enum";
import { Product } from "../product/product.model";


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