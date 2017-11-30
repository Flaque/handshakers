import { TICK_TIME } from "../constants";
import * as items from "../lib/items";
import { HANDSHAKES } from "../lib/currencies";
import { cost } from "./util";

// Action names
export const TICK = "TICK";

// Time
export const tick = () => {
  return { type: TICK };
};

export const tickAndUpdate = () => dispatch => {
  dispatch(tick());

  // Update or something
};

export const startClock = () => dispatch => {
  return setInterval(() => dispatch(tickAndUpdate()), TICK_TIME);
};
