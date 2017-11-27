import { addOnClickCurrencyModifier } from "../actions";
import { FOLLOWERS } from "./Currency";

export const IncreaseFollowers = amount => {
  return charge => {
    if (charge.currency !== FOLLOWERS) {
      return charge;
    }

    charge.cost += amount;
    return charge;
  };
};
