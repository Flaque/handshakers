import purchase from "../Purchase";

const genericUpgrade = {
  type: "FOO",
  costs: [
    {
      currency: "BANG", // Bang for your buck :P
      cost: 5
    }
  ]
};

test("purchase will throw if the upgrade has no cost", () => {
  expect(() => {
    purchase({}, {});
  }).toThrow();
});

test("purchase will return false if we can't buy it", () => {
  const wallet = {
    BANG: 0
  };

  expect(purchase(genericUpgrade, wallet)).toBe(false);
});

test("purchase will return false if we don't have the currency", () => {
  expect(purchase(genericUpgrade, {})).toBe(false);
});

test("purchase will return a set of charges if we do have the currency", () => {
  expect(
    purchase(genericUpgrade, {
      BANG: 10
    })[0]
  ).toMatchObject({
    cost: 5,
    currency: "BANG"
  });
});
