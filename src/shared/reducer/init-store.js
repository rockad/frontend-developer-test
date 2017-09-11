// @flow

import Immutable from "immutable";
import {createStore} from "redux";

import reducer from "./reducer";

const initStore = (plainPartialState: ?Object, enhancers) => {
  let preloadedState = {};

  if (plainPartialState) {
    Object.keys(plainPartialState).forEach(key => {
      preloadedState[key] = Immutable.fromJS(plainPartialState[key]);
    });
  }

  return createStore(reducer, preloadedState, enhancers);
};

export default initStore;
