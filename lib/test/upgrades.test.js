import * as upgrades from "../Upgrade";

test("There are some upgrades", () => {
  expect(Object.keys(upgrades).length >= 1).toBe(true);
});

test("upgrades match the format", () => {
  for (let upgrade of Object.values(upgrades)) {
    expect(upgrade).toHaveProperty("type");
    expect(upgrade).toHaveProperty("costs");
    expect(upgrade).toHaveProperty("label");
  }
});
