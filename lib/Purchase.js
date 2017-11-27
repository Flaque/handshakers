// Returns a set of charges for purchase or "false" if we can't buy
export default (upgrade, wallet) => {
  if (!upgrade.costs) {
    throw new Error("This upgrade has no costs. That's probably bad.");
  }

  const charges = [];
  let canBuy = true;

  upgrade.costs.forEach(({ cost, currency }) => {
    // We can't buy if we don't have that currency
    if (!wallet[currency]) {
      canBuy = false;
      return;
    }

    // Pay!
    const charge = cost;

    // Can't buy this item!
    if (wallet[currency] - cost < 0) {
      canBuy = false;
      return;
    }

    // Record charge
    charges.push({
      cost: charge,
      currency: currency
    });
  });

  // If we can't buy something, let the user know
  if (!canBuy) {
    return false;
  }

  // Otherwise return costs
  return charges;
};
