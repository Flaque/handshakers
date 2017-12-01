import { HANDSHAKES } from "./currencies";
import { maybe } from "../util";
import { Map } from "immutable";

export const AutoHandShakers = {
  type: "AutoHandShakers",
  cost: function(state) {
    const count = state.app.wallet.get(this.type) || 0;
    return Map({ [HANDSHAKES]: -(1 * count * 2) });
  },
  effect: state => {
    return Map({ [HANDSHAKES]: 0.1 });
  }
};
