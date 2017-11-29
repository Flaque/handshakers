import isFunc from "is-function";
import { add, inTheBlack } from "../util";

export const cost = (item, state) => {
  if (!item.cost) return { canBuy: true, cost: {} };

  if (!isFunc(item.cost)) {
    throw new Error(
      `The item ${item.type} has a cost value that's not a function.`
    );
  }

  const total = item.cost(state);
  const finalLedger = add(total, state.app.wallet);

  if (inTheBlack(finalLedger)) {
    return { canBuy: true, ledger: total };
  } else {
    return { canBuy: false, ledger: total };
  }
};
