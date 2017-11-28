import { TICK_TIME } from "../constants";
import { maybe } from "../util";

// Action names
export const TICK = "TICK";
export const UPDATE_HANDSHAKES = "UPDATE_HANDSHAKES";
export const UPDATE_FOLLOWERS = "UPDATE_FOLLOWERS";
export const UPDATE_AUTO_HANDSHAKERS = "UPDATE_AUTO_HANDSHAKERS";

const FOLLOWER_COST = 10;
const autoHandShakerRate = 3;

export const updateFollowers = amount => {
  return { type: UPDATE_FOLLOWERS, amount };
};

export const updateHandshakes = amount => {
  return { type: UPDATE_HANDSHAKES, amount: amount };
};

export const updateAutoHandshakers = amount => {
  return { type: UPDATE_AUTO_HANDSHAKERS, amount: amount };
};

export const shakeHands = () => (dispatch, getState) => {
  dispatch(updateHandshakes(1));
};

export const buyFollower = () => (dispatch, getState) => {
  if (getState().wallet.handshakes < FOLLOWER_COST) {
    return;
  }

  dispatch(updateHandshakes(-FOLLOWER_COST));
  dispatch(updateFollowers(1));

  if (getState().wallet.followers % autoHandShakerRate === 0) {
    dispatch(updateAutoHandshakers(1));
  }
};

export const update = () => (dispatch, getState) => {
  dispatch(updateHandshakes(maybe(getState().pouch.autoHandshakers, 0)));
};

export const tick = () => {
  return { type: TICK };
};

export const tickAndUpdate = () => dispatch => {
  dispatch(update());
  dispatch(tick());
};

export const startClock = () => dispatch => {
  return setInterval(() => dispatch(tickAndUpdate()), TICK_TIME);
};
