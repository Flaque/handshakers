import { TICK_TIME } from "../constants";
import * as items from "../lib/pouch";
import { HANDSHAKES } from "../lib/currencies";
import { cost } from "./util";
import invariant from "invariant";
import { buy, inTheBlack, addItem, pouchEffectsLedger } from "merchant.js";

// Action names
export const TICK = "TICK";
export const SET_WALLET = "SET_WALLET";
export const ADD_ITEM = "ADD_ITEM";
export const SET_POUCH_EFFECTS_LEDGER = "SET_POUCH_EFFECTS_LEDGER";

// Ledgers
export const setWallet = wallet => {
  return { type: SET_WALLET, wallet: wallet };
};

export const addLedger = ledger => (dispatch, getState) => {
  const wallet = getState().app.wallet;
  dispatch(setWallet(add(wallet, ledger)));
};

export const setPouchEffectsLedger = ledger => {
  return { type: SET_POUCH_EFFECTS_LEDGER, ledger: ledger };
};

export const buyItem = (type, pouch = items) => (dispatch, getState) => {
  const item = pouch[type];
  invariant(
    item,
    `The buyItem attempted to buy something called: "${
      type
    }" that wasn't defined in the pouch`
  );

  const state = getState();
  const wallet = buy(item, state.app.wallet, state);
  if (!inTheBlack(wallet)) {
    return;
  }

  // Add the item to the wallet
  const newWallet = addItem(item, wallet);

  // Update wallet
  dispatch(setWallet(newWallet));

  // Update pouchEffectsLedger
  dispatch(setPouchEffectsLedger(pouchEffectsLedger(pouch, newWallet, state)));
};

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
