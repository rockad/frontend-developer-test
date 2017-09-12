import {actions} from "../action/cart";
import reducer from "./cart";

const products = require("../data/products.json");

const product = products[0];

const initialState = {
  contents: null,
  isLoading: false,
  loaded: false,
  initialized: false,
};

describe("reducer", () => {
  let state;

  it("should return the initial state", () => {
    state = reducer(undefined, {});
    expect(state.toJS()).toEqual(initialState);
  });

  it("should handle ADD_TO_CART", () => {
    state = reducer(state, actions.addToCart(product));
    expect(state.toJS()).toEqual({
      contents: {
        products: {
          [product.id]: {
            ...product,
            qty: 1,
            total: parseInt(product.price, 10)
          }
        },
        totalQty: 1,
        totalPrice: parseInt(product.price, 10)
      },
      isLoading: false,
      loaded: false,
      initialized: false,
    });
  });

  it("should handle CLEAR_CART", () => {
    state = reducer(state, actions.clearCart());
    expect(state.toJS()).toEqual(initialState);
  });
});
