import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

export const initialState = {
  upgrades: [],
  wallet: {},
  onClickModifiers: [],
  onTickModifiers: []
};

export const initStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
