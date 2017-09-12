// @flow

import Immutable from "immutable";
import {createStore} from "redux";

import reducer from "./reducer";

const initStore = (plainPartialState: ?Object, enhancers: ?Object) => {
  const preloadedState = {};

  if (plainPartialState) {
    Object.keys(plainPartialState).forEach((key) => {
      // flow-disable-next-line
      preloadedState[key] = Immutable.fromJS(plainPartialState[key]);
    });
  }

  return createStore(reducer, preloadedState, enhancers);
};

export default initStore;
