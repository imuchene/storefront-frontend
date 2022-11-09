import { ActionsUnion, ActionTypes, Product } from "./actions";


export const initialState = {
  items: [],
  cart: []
};

export function shopReducer(state = initialState, action: ActionsUnion){
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        items: [...action.payload]
      }

    case ActionTypes.Add:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }

    case ActionTypes.Remove:
      return {
        ...state,
        cart: [...state.cart.filter((item:Product) => item.name !== action.payload.name )]
      }
  
    default:
      return state;
  }
}

