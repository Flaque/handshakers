/**
 * To add an upgrade, just add a new exported constant object.
 * The rest of the code auto-pulls in the whole lot here.
 */
import { FOLLOWERS } from "./Currency";
import { addOnClickCurrencyModifier, addUpgrade } from "../actions";
import { IncreaseFollowerOnClick } from "./Effects";

// Upgrade Types
export const CLIP_BOARD = {
  type: "CLIP_BOARD",
  label: "Clip Board",
  costs: [
    {
      cost: 10,
      currency: FOLLOWERS
    }
  ],
  onClickEffects: IncreaseFollowerOnClick(1)
};

export const BIG_HANDS = {
  type: "BIG_HANDS",
  label: "Big Hands; I guarantee you there's no problem",
  costs: [
    {
      cost: 50,
      currency: FOLLOWERS
    }
  ]
};
