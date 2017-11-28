import { initStore } from "../../store";
import { shakeHands, addLedger, buy, generateLedger } from "../index";
import { HANDSHAKES } from "../../lib/currencies";

const MagicSword = {
  type: "MagicSword",
  cost: state => {
    return { Gold: -1000 };
  },
  tick: state => {
    return { Power: 1 };
  }
};

test("addLedger adds a an item to the wallet", () => {
  const store = initStore();
  store.dispatch(addLedger({ Foo: 1 }));
  expect(store.getState().app.wallet["Foo"]).toBe(1);
});

test("shake hands adds Handshakes to the store", () => {
  const store = initStore();
  store.dispatch(shakeHands());
  expect(store.getState().app.wallet[HANDSHAKES]).toBe(1);
});

test("buying does not effect anything if we don't have the money", () => {
  const store = initStore();

  store.dispatch(addLedger({ Gold: 5 })); // Add some money
  store.dispatch(buy(MagicSword)); // Try to buy a really expensive item

  expect(store.getState().app.wallet[MagicSword.type]).toBeUndefined();
});

test("buying an item with enough money gives you that item as currency", () => {
  const store = initStore();

  store.dispatch(addLedger({ Gold: 999999 }));
  store.dispatch(buy(MagicSword));

  expect(store.getState().app.wallet[MagicSword.type]).toBe(1);
});

test("buying an item subtracts its cost from your wallet", () => {
  const store = initStore();

  store.dispatch(addLedger({ Gold: 1001 }));
  store.dispatch(buy(MagicSword));

  expect(store.getState().app.wallet.Gold).toBe(1);
});

test("generateLedger with an item with a tick updates the main ledger", () => {
  const store = initStore();

  store.dispatch(addLedger({ MagicSword: 1 }));
  store.dispatch(generateLedger({ MagicSword: MagicSword }));

  expect(store.getState().app.ledger.Power).toBe(1);
});
