import { addOnClickCurrencyModifier } from "../actions";
import { FOLLOWERS } from "./Currency";

export const IncreaseFollowerOnClick = amount => {
  return charge => {
    if (charge.currency !== FOLLOWERS) {
      return charge;
    }

    charge.cost += amount;
    return charge;
  };
};
