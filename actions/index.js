import { TICK_TIME } from "../constants";
import { maybe } from "../util";

// Action names
export const TICK = "TICK";
export const UPDATE_HANDSHAKES = "UPDATE_HANDSHAKES";
export const UPDATE_FOLLOWERS = "UPDATE_FOLLOWERS";

const followerRate = 100; // handshakes per follower

export const updateFollowers = amount => {
  return { type: UPDATE_FOLLOWERS, amount };
};

export const updateHandshakes = amount => {
  return { type: UPDATE_HANDSHAKES, amount: amount };
};

export const shakeHands = () => (dispatch, getState) => {
  dispatch(updateHandshakes(1));
  const shouldAddFollower =
    maybe(getState().wallet.handshakes, 0) % followerRate === 0;

  if (shouldAddFollower) {
    dispatch(updateFollowers(1));
  }
};

export const tick = () => {
  return { type: TICK };
};

export const startClock = () => dispatch => {
  return setInterval(() => dispatch(tick()), TICK_TIME);
};
