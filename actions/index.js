import purchase from "../lib/Purchase";

// Action names
export const ADD_HANDSHAKES = "ADD_HANDSHAKES";
export const ADD_UPGRADE = "ADD_UPGRADE";
export const PAY = "PAY";

// Action creators
export const addHandshakes = number => {
  return { type: ADD_HANDSHAKES, number: number };
};

export const addUpgrade = upgrade => {
  return { type: ADD_UPGRADE, upgrade: upgrade };
};

export const pay = (currency, cost) => {
  return { type: PAY, currency: currency, cost: cost };
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

    dispatch(addUpgrade);
  };
};
