import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import Immutable from "immutable";

import {actions, CART_STORAGE_KEY, loadCart, storeCartData} from "./cart";

import products from "../data/products.json";

const product = products[0];

const mockStore = configureMockStore([thunkMiddleware]);

const initialStateEmpty = {
  cart: Immutable.fromJS({
    contents: null,
    isLoading: false,
    loaded: false,
    initialized: false,
  })
};

const cartData = {
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
};

describe("actions creators", () => {
  it("should create action ADD_TO_CART", () => {
    const expectedAction = {
      type: "ADD_TO_CART",
      payload: product
    };
    expect(actions.addToCart(product)).toEqual(expectedAction);
  });
  it("should create action REMOVE_FROM_CART", () => {
    const expectedAction = {
      type: "REMOVE_FROM_CART",
      payload: product.id
    };
    expect(actions.removeFromCart(product.id)).toEqual(expectedAction);
  });
  it("should create action CLEAR_CART", () => {
    const expectedAction = {
      type: "CLEAR_CART",
      payload: true
    };
    expect(actions.clearCart()).toEqual(expectedAction);
  });
  it("should create action STORE_CART", () => {
    const expectedAction = {
      type: "STORE_CART",
      payload: false
    };
    expect(actions.storeCart()).toEqual(expectedAction);
  });
  it("should create action ADD_TO_CART", () => {
    const expectedAction = {
      type: "LOAD_CART"
    };
    expect(actions.loadCart()).toEqual(expectedAction);
  });
  it("should create action LOAD_CART_SUCCESS", () => {
    const expectedAction = {
      type: "LOAD_CART_SUCCESS"
    };
    expect(actions.loadCartSuccess()).toEqual(expectedAction);
  });
  it("should create action LOAD_CART_FAILURE", () => {
    const expectedAction = {
      type: "LOAD_CART_FAILURE"
    };
    expect(actions.loadCartFailure()).toEqual(expectedAction);
  });
});


describe("cart data", () => {
  localStorage.clear();

  it("no cart data", () => {
    const store = mockStore(() => initialStateEmpty);
    const {dispatch, getState} = store;

    return loadCart()(dispatch, getState)
      .then(() => {
        const storeActions = store.getActions();
        const expectedActions = [{type: "LOAD_CART"},
          {type: "LOAD_CART_FAILURE", payload: "No cart data!"}];

        expect(storeActions).toEqual(expectedActions);
      });
  });

  it("store cart data", () => {
    storeCartData(cartData);

    expect(localStorage.setItem)
      .toHaveBeenLastCalledWith(CART_STORAGE_KEY, JSON.stringify(cartData.contents));
    // eslint-disable-next-line no-underscore-dangle
    expect(localStorage.__STORE__[CART_STORAGE_KEY]).toBe(JSON.stringify(cartData.contents));
    // eslint-disable-next-line no-underscore-dangle
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  it("preloaded cart data", () => {
    const store = mockStore(() => initialStateEmpty);
    const {dispatch, getState} = store;

    return loadCart()(dispatch, getState)
      .then(() => {
        const storeActions = store.getActions();
        const expectedActions = [
          {type: "LOAD_CART"},
          {type: "LOAD_CART_SUCCESS", payload: cartData.contents}
        ];

        expect(storeActions).toEqual(expectedActions);
      });
  });
});
