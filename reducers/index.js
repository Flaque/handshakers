import {
  TICK,
  SET_WALLET,
  SET_POUCH_EFFECTS_LEDGER,
  UPDATE_WALLET,
  SHOW_ITEM
} from "../actions";
import { combineReducers } from "redux";
import { newWith } from "../util";
import { add } from "merchant.js";
import { Map, Set } from "immutable";

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

const app = (
  state = { wallet: Map(), ledger: Map(), items: [], shown: Set() },
  action
) => {
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
    case SHOW_ITEM:
      const shown = Set.isSet(state.shown) ? state.shown : Set();
      return newWith(state, {
        shown: shown.add(action.item.type)
      });
    default:
      return state;
  }
};

export default combineReducers({ app, time });
