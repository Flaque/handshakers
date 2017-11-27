import reducers from "../index";
import {
  pay,
  addCurrency,
  reset,
  addHandshakesWithClick,
  buyUpgrade,
  addOnClickCurrencyModifier,
  addOnTickCurrencyModifier
} from "../../actions";
import { FOLLOWERS } from "../../lib/Currency";
import { initStore } from "../../store";
import { CLIP_BOARD } from "../../lib/Upgrade";
import { IncreaseFollowerOnClick } from "../../lib/Modifiers";
import isFunc from "is-function";

const currency = "foo";

describe("reducers", () => {
  let state = undefined;

  beforeEach(() => {
    state = reducers(state, reset());
  });

  test("Add currency increases the amount of currency", () => {
    state = reducers(state, addCurrency(currency, 10));
    expect(state.wallet[currency]).toBe(10);

    const newState = reducers(state, addCurrency(currency, 10));
    expect(newState.wallet[currency]).toBe(20);
  });

  test("Pay reduces the amount of currency", () => {
    state = reducers(state, addCurrency(currency, 10));
    expect(state.wallet[currency]).toBe(10);
    state = reducers(state, pay(currency, 5));
    expect(state.wallet[currency]).toBe(5);
  });

  test("AddHandshakesWithClick adds a follower", () => {
    const store = initStore();
    store.dispatch(addHandshakesWithClick());
    expect(store.getState().wallet[FOLLOWERS]).toBe(1);
  });

  test("buyUpgrade will actually add an upgrade", () => {
    const store = initStore();
    store.dispatch(addCurrency(FOLLOWERS, 100));
    store.dispatch(buyUpgrade(CLIP_BOARD));
    expect(store.getState().upgrades[0].type).toBe(CLIP_BOARD.type);
  });

  test("buyUpgrade will buy things for free", () => {
    const store = initStore();
    const FakeUpgrade = {
      type: "Blah",
      label: "blah blah",
      costs: []
    };
    store.dispatch(buyUpgrade(FakeUpgrade));
    expect(store.getState().upgrades[0].type).toBe(FakeUpgrade.type);
  });

  test("buying an upgade with an onClickEffect will add it to the list", () => {
    const store = initStore();
    const modifier = () => {};
    const FakeUpgrade = {
      type: "Blah",
      label: "blah blah",
      costs: [],
      onClickModifiers: [modifier]
    };
    store.dispatch(buyUpgrade(FakeUpgrade));
    expect(store.getState().onClickModifiers[0]).toBe(modifier);
  });

  test("Add onclick modifiers adds extra modifiers", () => {
    const store = initStore();
    const modifier = () => {
      const foo = 0;
    };
    store.dispatch(addOnClickCurrencyModifier(modifier));

    expect(store.getState().onClickModifiers[0]).toBe(modifier);
  });

  test("Add ontick modifiers adds extra modifiers", () => {
    const store = initStore();
    const modifier = () => {
      const foo = 0;
    };
    store.dispatch(addOnTickCurrencyModifier(modifier));

    expect(store.getState().onTickModifiers[0]).toBe(modifier);
  });

  test("Upgrade will increase the number of followers on click", () => {
    const store = initStore();
    const FakeUpgrade = {
      type: "Blah",
      label: "blah blah",
      costs: [],
      onClickModifiers: [IncreaseFollowerOnClick(1)]
    };

    store.dispatch(buyUpgrade(FakeUpgrade));
    store.dispatch(addHandshakesWithClick());
    expect(store.getState().wallet[FOLLOWERS]).toBe(2);
  });
});
