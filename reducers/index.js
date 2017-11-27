import {
  ADD_CURRENCY,
  ADD_UPGRADE,
  PAY,
  ADD_ON_CLICK_CURRENCY_MODIFER,
  ADD_ON_TICK_CURRENCY_MODIFER
} from "../actions";
import { initialState } from "../store";

const App = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENCY: {
      const wallet = state.wallet || {};
      wallet[action.currency] = wallet[action.currency]
        ? wallet[action.currency] + action.cost
        : 0 + action.cost;

      return Object.assign({}, state, {
        wallet: wallet
      });
    }
    case ADD_UPGRADE: {
      action.upgrade.bought = true;
      return Object.assign({}, state, {
        upgrades: [...state.upgrades, action.upgrade]
      });
    }
    case ADD_ON_CLICK_CURRENCY_MODIFER:
      return Object.assign({}, state, {
        onClickModifiers: [...state.onClickModifiers, action.modifiers]
      });
    case ADD_ON_TICK_CURRENCY_MODIFER:
      return Object.assign({}, state, {
        onTickModifiers: [...state.onTickModifiers, action.modifiers]
      });
    case PAY: {
      const wallet = state.wallet || {};
      wallet[action.currency] = wallet[action.currency]
        ? wallet[action.currency] - action.cost
        : 0 - action.cost;

      return Object.assign({}, state, {
        wallet: wallet
      });
    }
    default:
      return state;
  }
};

export default App;
