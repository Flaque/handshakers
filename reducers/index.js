import {
  TICK,
  UPDATE_HANDSHAKES,
  UPDATE_FOLLOWERS,
  UPDATE_AUTO_HANDSHAKERS,
  UPDATE_TOTAL_HANDSHAKES
} from "../actions";
import dotProp from "dot-prop-immutable";
import { combineReducers } from "redux";
import { newWith, maybe, add } from "../util";

const stats = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_HANDSHAKES:
      return newWith(state, {
        handshakes: add(state.handshakes, action.amount)
      });
    default:
      return state;
  }
};

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

// For items / volunteers / objects
const pouch = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AUTO_HANDSHAKERS:
      return newWith(state, {
        autoHandshakers: add(state.autoHandshakers, action.amount)
      });
    default:
      return state;
  }
};

// For currencies
const wallet = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HANDSHAKES:
      return newWith(state, {
        handshakes: add(state.handshakes, action.amount)
      });
    case UPDATE_FOLLOWERS:
      return newWith(state, {
        followers: add(state.followers, action.amount)
      });
    default:
      return state;
  }
};

export default combineReducers({ time, wallet, pouch, stats });
