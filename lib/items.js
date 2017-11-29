import { HANDSHAKES } from "./currencies";
import { maybe } from "../util";
import { simpleLedger } from "./ledger";

export const AutoHandShakers = {
  type: "AutoHandShakers",
  cost: function(state) {
    return simpleLedger(
      HANDSHAKES,
      -(maybe(state.app.wallet[this.type], 0) * 2 + 1)
    );
  },
  tick: state => {
    return simpleLedger(HANDSHAKES, 1);
  }
};
