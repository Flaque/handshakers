import { TICK, UPDATE_HANDSHAKES, UPDATE_FOLLOWERS } from "../actions";
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

export default combineReducers({ time, wallet });
