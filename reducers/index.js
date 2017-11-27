import {
  ADD_CURRENCY,
  ADD_UPGRADE,
  PAY,
  ADD_ON_CLICK_CURRENCY_MODIFER,
  ADD_ON_TICK_CURRENCY_MODIFER,
  RESET,
  TICK
} from "../actions";
import dotProp from "dot-prop-immutable";
import { initialState } from "../store";

const App = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENCY: {
      const cost = dotProp.get(state, `wallet.${action.currency}`) || 0;
      return dotProp.set(
        state,
        `wallet.${action.currency}`,
        cost + action.cost
      );
    }
    case ADD_UPGRADE: {
      action.upgrade.bought = true;
      return Object.assign({}, state, {
        upgrades: [...state.upgrades, action.upgrade]
      });
    }
    case ADD_ON_CLICK_CURRENCY_MODIFER:
      return Object.assign({}, state, {
        onClickModifiers: [...state.onClickModifiers, action.modifier]
      });
    case ADD_ON_TICK_CURRENCY_MODIFER:
      return Object.assign({}, state, {
        onTickModifiers: [...state.onTickModifiers, action.modifier]
      });
    case PAY: {
      const currentBalance =
        dotProp.get(state, `wallet.${action.currency}`) || 0;
      return dotProp.set(
        state,
        `wallet.${action.currency}`,
        currentBalance - action.cost
      );
    }
    case TICK:
      const current = state.ticks || 0;
      return Object.assign({}, state, {
        ticks: current + 1
      });
    default:
      return state;
  }
};

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined;
  }

  return App(state, action);
};

export default rootReducer;
