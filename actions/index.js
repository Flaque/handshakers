import purchase from "../lib/Purchase";
import { FOLLOWERS } from "../lib/Currency";
import { TICK_TIME } from "../constants";
import isFunc from "is-function";

// Action names
export const ADD_CURRENCY = "ADD_CURRENCY";
export const ADD_UPGRADE = "ADD_UPGRADE";
export const PAY = "PAY";
export const ADD_ON_TICK_CURRENCY_MODIFER = "ADD_ON_TICK_CURRENCY_MODIFER";
export const ADD_ON_CLICK_CURRENCY_MODIFER = "ADD_ON_CLICK_CURRENCY_MODIFER";
export const RESET = "RESET";
export const TICK = "TICK";

// Action creators
export const addHandshakesWithClick = () => {
  return (dispatch, getState) => {
    let charge = {
      cost: 1,
      currency: FOLLOWERS
    };

    getState().onClickModifiers.forEach(modify => {
      charge = modify(charge);
    });

    dispatch(addCurrency(charge.currency, charge.cost));
  };
};

export const updateWalletOnTick = () => (dispatch, getState) => {
  let charge = {};

  getState().onTickModifiers.forEach(modify => {
    if (!isFunc(modify)) {
      throw new Error("Modify function is not a function");
    }
    charge = modify(charge);
  });

  dispatch(addCurrency(charge.currency, charge.cost));
};

export const addCurrency = (currency, cost) => {
  return { type: ADD_CURRENCY, cost: cost, currency: currency };
};

export const addOnTickCurrencyModifier = modifier => {
  return { type: ADD_ON_TICK_CURRENCY_MODIFER, modifier: modifier };
};

export const addOnClickCurrencyModifier = modifier => {
  return { type: ADD_ON_CLICK_CURRENCY_MODIFER, modifier: modifier };
};

export const addUpgrade = upgrade => {
  return { type: ADD_UPGRADE, upgrade: upgrade };
};

export const pay = (currency, cost) => {
  return { type: PAY, currency: currency, cost: cost };
};

export const tick = () => {
  return { type: TICK };
};

export const tickAndUpdate = () => dispatch => {
  dispatch(updateWalletOnTick());
  dispatch(tick());
};

export const startClock = () => dispatch => {
  return setInterval(() => dispatch(tickAndUpdate()), TICK_TIME);
};

export const buyUpgrade = upgrade => {
  return (dispatch, getState) => {
    const charges = purchase(upgrade, getState().wallet);
    if (!charges) {
      return; // We can't purchase so do nothing
    }

    charges.forEach(({ currency, cost }) => {
      dispatch(pay(currency, cost));
    });

    // Add upgrade
    dispatch(addUpgrade(upgrade));

    upgrade.onClickModifiers = upgrade.onClickModifiers || [];
    upgrade.onTickModifiers = upgrade.onTickModifiers || [];

    // Add modifiers
    upgrade.onClickModifiers.forEach(modifier => {
      dispatch(addOnClickCurrencyModifier(modifier));
    });

    upgrade.onTickModifiers.forEach(modifier => {
      dispatch(addOnTickCurrencyModifier(modifier));
    });
  };
};

export const reset = upgrade => {
  return { type: RESET };
};
