import { HANDSHAKES } from "./currencies";
import { maybe } from "../util";
import { Map, Set } from "immutable";
import { add, inTheBlack } from "merchant.js";

const shownBefore = (state, item) => {
  if (!state.app.shown) return false;
  return state.app.shown.includes(item.type);
};

export const AutoHandShakers = {
  type: "AutoHandShakers",
  baseCost: 10,
  cost: function(state) {
    const count = state.app.wallet.get(this.type) || 0;
    return Map({ [HANDSHAKES]: -(this.baseCost + 2 * count) });
  },
  effect: state => {
    return Map({ [HANDSHAKES]: 0.1 });
  },
  show: function(state) {
    if (shownBefore(state, this)) {
      return true;
    }

    // Show if we can afford it
    const canAfford = inTheBlack(add(state.app.wallet, this.cost(state)));
    return canAfford;
  }
};
