import type {fromJS as Immut} from "immutable";
import Immutable from "immutable";

import {
  ADD_TO_CART,
  CLEAR_CART,
  LOAD_CART,
  LOAD_CART_FAILURE,
  LOAD_CART_SUCCESS,
  REMOVE_FROM_CART
} from "../action/cart";

import CartModel from "../models/cart";

const initialState = Immutable.fromJS({
  contents: null,
  isLoading: false,
  loaded: false,
  initialized: false,
});

const cartModel = new CartModel();

const cartReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOAD_CART:
      return state.withMutations(s => s.set("isLoading", true).set("initialized", true));
    case LOAD_CART_SUCCESS:
      cartModel.parse(action.payload);
      return state.withMutations(s =>
        s.set("isLoading", false).set("loaded", true)
          .set("contents", cartModel.contents));
    case LOAD_CART_FAILURE:
      return state.withMutations(s => s.set("isLoading", false).set("loaded", false));
    case ADD_TO_CART:
      cartModel.parse(state.get("contents"));
      cartModel.add(action.payload);
      return state.set("contents", cartModel.contents);
    case REMOVE_FROM_CART:
      cartModel.parse(state.get("contents"));
      cartModel.remove(action.payload);
      return state.set("contents", cartModel.contents);
    case CLEAR_CART:
      return state.set("contents", null);
    default:
      return state;
  }
};

export default cartReducer;