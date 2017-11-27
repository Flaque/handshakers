import { addOnClickCurrencyModifier } from "../actions";

export const IncreaseFollowerOnClick = amount => {
  return dispatch => {
    dispatch(
      addOnClickCurrencyModifier(charge => {
        if (charge.currency !== FOLLOWERS) {
          return charge;
        }

        charge.cost += this.addition;
        return charge;
      })
    );
  };
};
