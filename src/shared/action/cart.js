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
  LOAD_CART_FAILURE: null,
});


export const addToCart = product => (dispatch: Function, getState: Function) => {
  const {addToCart, storeCart} = actions;
  dispatch(addToCart(product));

  const {cart} = getState();
  dispatch(storeCart(cart.toJS()));
};


export const removeFromCart = productId => (dispatch: Function, getState: Function) => {
  const {removeFromCart, storeCart} = actions;
  dispatch(removeFromCart(productId));

  const {cart} = getState();
  dispatch(storeCart(cart.toJS()));
};

export const loadCart = () => (dispatch: Function) => {
  const {loadCart, loadCartSuccess, loadCartFailure} = actions;

  dispatch(loadCart());

  return new Promise((resolve, reject) => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);

    try {
      const cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
      if (cart) {
        setTimeout(() => {
          dispatch(loadCartSuccess(cart));
          return resolve(cart);
        }, 500);
      } else {
        dispatch(loadCartFailure("No cart data!"));
        return resolve(null);
      }
    } catch (e) {
      dispatch(loadCartFailure("Cart data loading failed!"));
      return reject(null);
    }


  });
};

export const {clearCart} = actions;