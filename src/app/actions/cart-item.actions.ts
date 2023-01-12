import { createAction, props } from "@ngrx/store";
import { CartActionTypes } from "../enums/cart-item.enum";

export const loadTotalItems = createAction(
  CartActionTypes.LOAD_TOTAL_ITEMS,
  props<{ totalItems: number }>()
)