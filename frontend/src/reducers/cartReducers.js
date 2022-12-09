import {CART_ADD_ITEM} from '../constants/cartConstants'

export const cartReducer =(state={cartItems:[]},action)=>{
  switch(action.type){
    case CART_ADD_ITEM:
      const item = action.payload
    default:
      return state
  }
}