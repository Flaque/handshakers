import {
  TICK,
  SET_WALLET,
  SET_POUCH_EFFECTS_LEDGER,
  UPDATE_WALLET
} from "../actions";
import { combineReducers } from "redux";
import { newWith } from "../util";
import { add } from "merchant.js";
import { Map } from "immutable";

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

const app = (state = { wallet: Map(), ledger: Map(), items: [] }, action) => {
  switch (action.type) {
    case UPDATE_WALLET:
      return newWith(state, {
        wallet: add(Map(state.wallet), Map(state.ledger))
      });
    case SET_WALLET:
      return newWith(state, {
        wallet: action.wallet
      });
    case SET_POUCH_EFFECTS_LEDGER:
      return newWith(state, {
        ledger: action.ledger
      });
    default:
      return state;
  }
};

export default combineReducers({ app, time });
