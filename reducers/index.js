import { TICK } from "../actions";
import { combineReducers } from "redux";
import { newWith } from "../util";

const time = (state = {}, action) => {
  switch (action.type) {
    case TICK:
      const current = state.ticks || 0;
      return newWith(state, {
        ticks: current + 1
      });
    default:
      return state;
  }
};

const app = (state = { wallet: {}, ledger: {}, items: [] }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ app, time });
