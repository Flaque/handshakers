import { TICK, ADD_LEDGER, UPDATE_WALLET, SET_LEDGER } from "../actions";
import dotProp from "dot-prop-immutable";
import { combineReducers } from "redux";
import { newWith, maybe, add } from "../util";

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
    case ADD_LEDGER:
      return Object.assign({}, state, {
        wallet: add(state.wallet, action.ledger)
      });
    case UPDATE_WALLET:
      return Object.assign({}, state, {
        wallet: add(state.wallet, state.ledger)
      });
    case SET_LEDGER:
      return Object.assign({}, state, {
        ledger: action.ledger
      });
    default:
      return state;
  }
};

export default combineReducers({ app, time });
