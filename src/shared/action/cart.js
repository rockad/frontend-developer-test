import "isomorphic-fetch";

import {createActions} from "redux-actions";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const {addToCart, removeFromCart, clearCart} = createActions({
  ADD_TO_CART: product => product,
  REMOVE_FROM_CART: productId => productId,
  CLEAR_CART: null
});