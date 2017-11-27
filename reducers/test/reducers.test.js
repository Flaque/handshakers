import reducers from "../index";
import { pay, addCurrency, reset } from "../../actions";

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
});
