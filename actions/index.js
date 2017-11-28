import { TICK_TIME } from "../constants";
import { maybe, add } from "../util";
import * as items from "../lib/items";
import { HANDSHAKES } from "../lib/currencies";
import { simpleLedger } from "../lib/ledger";
import { cost } from "./util";

// Action names
export const TICK = "TICK";
export const ADD_LEDGER = "ADD_LEDGER";
export const UPDATE_WALLET = "UPDATE_WALLET";
export const SET_LEDGER = "SET_LEDGER";

// Clickers
export const shakeHands = () => dispatch => {
  dispatch(addLedger(simpleLedger(HANDSHAKES, 1)));
};

// Wallet - Ledgers
export const buy = (item, amount = 1) => (dispatch, getState) => {
  const { canBuy, ledger } = cost(item, getState());
  if (!canBuy) return; // Don't buy if we can't afford it

  dispatch(addLedger(ledger)); // Buy
  dispatch(addLedger(simpleLedger(item.type, amount))); // Add item
  dispatch(generateLedger()); // Update mainLedger
};

export const addLedger = ledger => {
  return { type: ADD_LEDGER, ledger: ledger };
};

export const updateWallet = () => {
  return { type: UPDATE_WALLET };
};

export const generateLedger = (pouch = items) => (dispatch, getState) => {
  // Loop through all items and get each items "tick" ledger
  const wallet = getState().app.wallet || {};
  const ledgers = Object.keys(wallet)
    .map(name => {
      if (pouch[name] && pouch[name].tick) {
        return pouch[name].tick(getState());
      }
    })
    .filter(n => n); // Get rid of nulls or undefineds

  const mainLedger = add(...ledgers);
  dispatch({ type: SET_LEDGER, ledger: mainLedger });
};

export const update = () => dispatch => {
  dispatch(updateWallet());
};

// Time
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
