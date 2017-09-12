import React from "react";
import {mount} from "enzyme";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Immutable from "immutable";

import Menu from "./menu";

const products = require("../data/products.json");

const initialStateEmpty = {
  cart: Immutable.fromJS({
    contents: null,
    isLoading: false,
    loaded: false,
    initialized: false,
  })
};

const mockStore = configureMockStore([thunkMiddleware]);

function setup(state) {
  const store = mockStore(() => state);

  const props = {
    addToCart: jest.fn(),
    products
  };

  const enzymeWrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Menu {...props} />
      </MemoryRouter>
    </Provider>
  );

  return {
    props,
    enzymeWrapper,
    store
  };
}

describe("render", () => {
  it("should render cart and products list", () => {
    const {enzymeWrapper} = setup(initialStateEmpty);
    expect(enzymeWrapper.find("Product").length).toBe(products.length);
  });

  it("should render empty cart", () => {
    const {enzymeWrapper} = setup(initialStateEmpty);
    const cart = enzymeWrapper.find("Cart");
    expect(enzymeWrapper.find("Cart").length).toBe(1);
    expect(cart.props().contents).toBeNull();
  });
});
