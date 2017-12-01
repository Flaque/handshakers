import { TICK_TIME } from "../constants";
import * as items from "../lib/pouch";
import { HANDSHAKES } from "../lib/currencies";
import { cost } from "./util";
import invariant from "invariant";
import { Map } from "immutable";
import { buy, inTheBlack, addItem, pouchEffectsLedger, add } from "merchant.js";

// Action names
export const TICK = "TICK";
export const UPDATE_WALLET = "UPDATE_WALLET";
export const SET_WALLET = "SET_WALLET";
export const ADD_ITEM = "ADD_ITEM";
export const SET_POUCH_EFFECTS_LEDGER = "SET_POUCH_EFFECTS_LEDGER";
export const SHOW_ITEM = "SHOW_ITEM";

// Action Creators
export const showItem = item => {
  return { type: SHOW_ITEM, item: item };
};

export const setWallet = wallet => {
  return { type: SET_WALLET, wallet: wallet };
};

export const addLedger = ledger => (dispatch, getState) => {
  const wallet = Map(getState().app.wallet);
  dispatch(setWallet(add(wallet, ledger)));
};

export const shakeHands = (pouch = items) => dispatch => {
  dispatch(addLedger(Map({ [HANDSHAKES]: 1 })));

  // Set items as "show" or not "show"
  dispatch(setPouchShown(pouch));
};

export const setPouchEffectsLedger = ledger => {
  return { type: SET_POUCH_EFFECTS_LEDGER, ledger: ledger };
};

export const setPouchShown = (pouch = items) => (dispatch, getState) => {
  Object.values(pouch).forEach(item => {
    if (!item.show) return null;
    if (item.show(getState())) {
      dispatch(showItem(item));
    }
  });
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
  dispatch(
    setPouchEffectsLedger(
      pouchEffectsLedger(Object.values(pouch), newWallet, state)
    )
  );

  // Set items as "show" or not "show"
  dispatch(setPouchShown(pouch));
};

export const updateWallet = () => {
  return { type: UPDATE_WALLET };
};

// Time
export const tick = () => {
  return { type: TICK };
};

export const tickAndUpdate = () => dispatch => {
  dispatch(tick());
  dispatch(updateWallet());
};

export const startClock = () => dispatch => {
  return setInterval(() => dispatch(tickAndUpdate()), TICK_TIME);
};
