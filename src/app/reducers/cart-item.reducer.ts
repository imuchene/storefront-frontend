import { createReducer, on } from '@ngrx/store';
import { totalItemsAction } from '../actions/cart-item.actions';
import { CartState } from '../states/cart.state';

const initialState: CartState = {
  totalItems: 0,
  totalValue: 0,
};

export const cartReducer = createReducer(
  initialState,
  on(totalItemsAction, (state, { totalItems, totalValue }) => ({
    ...state,
    totalItems: totalItems,
    totalValue: totalValue,
  })),
);
