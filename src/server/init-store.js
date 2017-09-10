// @flow

import Immutable from "immutable";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "../shared/reducer/reducer";

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? Immutable.fromJS(plainPartialState) : undefined;

  return createStore(reducer,
    {}, applyMiddleware(thunkMiddleware));
};

export default initStore;
