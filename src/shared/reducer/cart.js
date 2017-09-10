import type {fromJS as Immut} from "immutable";
import Immutable from "immutable";

import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART} from "../action/cart";

import CartModel from "../models/cart";

const initialState = Immutable.fromJS({
  contents: null
});

const cartModel = new CartModel();

const cartReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
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