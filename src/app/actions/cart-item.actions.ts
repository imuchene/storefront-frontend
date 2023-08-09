import { createAction, props } from '@ngrx/store';
import { CartActionTypes } from '../enums/cart-item.enum';

export const totalItemsAction = createAction(
  CartActionTypes.TOTAL_ITEMS,
  props<{ totalItems: number; totalValue: number }>(),
);
