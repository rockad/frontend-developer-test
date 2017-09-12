// @flow
import "isomorphic-fetch";

import {createActions} from "redux-actions";

export const ADD_TO_CART = "ADD_TO_CART";
export const STORE_CART = "STORE_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const LOAD_CART = "LOAD_CART";
export const LOAD_CART_SUCCESS = "LOAD_CART_SUCCESS";
export const LOAD_CART_FAILURE = "LOAD_CART_FAILURE";

const CART_STORAGE_KEY = "cart";

function storeCartData(data: Object) {
  if (data && data.contents) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data.contents));
    return true;
  }
  return false;
}

function clearCartData() {
  localStorage.removeItem(CART_STORAGE_KEY);
  return true;
}

const actions = createActions({
  ADD_TO_CART: product => product,
  REMOVE_FROM_CART: productId => productId,
  CLEAR_CART: clearCartData,
  STORE_CART: storeCartData,
  LOAD_CART: null,
  LOAD_CART_SUCCESS: null,
  LOAD_CART_FAILURE: null
});


export const addToCart = (product: Object) => (dispatch: Function, getState: Function) => {
  dispatch(actions.addToCart(product));

  const {cart} = getState();
  dispatch(actions.storeCart(cart.toJS()));
};


export const removeFromCart = (productId: Object) => (dispatch: Function, getState: Function) => {
  dispatch(actions.removeFromCart(productId));

  const {cart} = getState();
  dispatch(actions.storeCart(cart.toJS()));
};

export const loadCart = () => (dispatch: Function) => {
  dispatch(actions.loadCart());

  return new Promise((resolve, reject) => {
    try {
      // flow-disable-next-line
      const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
      if (cart) {
        setTimeout(() => {
          dispatch(actions.loadCartSuccess(cart));
          return resolve(cart);
        }, 500);
      } else {
        dispatch(actions.loadCartFailure("No cart data!"));
        return resolve(null);
      }
    } catch (e) {
      dispatch(actions.loadCartFailure("Cart data loading failed!"));
      return reject(null);
    }
  });
};

export const {clearCart} = actions;
