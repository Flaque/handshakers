import unique from "array-unique";

export const newWith = (state, update) => {
  return Object.assign({}, state, update);
};

export const maybe = (item, defaultValue) => {
  return item || defaultValue;
};

/**
 * Returns the unique currencies defined in the ledgers
 * @param {Array of LedgerLike} ledgers
 */
export const currencies = ledgers => {
  if (!ledgers) {
    return [];
  }

  if (ledgers.length === 1) {
    return Object.keys(ledgers);
  }

  const keys2d = ledgers.map(ledger => Object.keys(ledger));
  return unique([].concat(...keys2d)); // flatten 2d into 1d
};

/**
 * Adds the total value of a currency for every ledger
 * @param {String} currency
 * @param {Array of LedgerLike} ledgers
 */
export const addLedgerRow = (currency, ledgers) => {
  let value = 0;
  ledgers.forEach(ledger => {
    value += maybe(ledger[currency], 0);
  });
  return value;
};

/**
 * Adds two ledgers together
 * @param {Array of LedgerLike} ledgers
 */
export const add = (...ledgers) => {
  const _ledgers = ledgers.filter(n => n); // Remove undefined and null

  // If there's nothing left just return
  if (_ledgers.length === 0) {
    return {};
  }

  // If there's just 1 return
  if (_ledgers.length === 1) {
    return _ledgers[0];
  }

  const keys = currencies(_ledgers);
  let obj = {};
  for (let key of keys) {
    obj[key] = addLedgerRow(key, _ledgers);
  }
  return obj;
};

/**
 * Returns true if all values are greater than or equal to zero
 * @param {LedgerLike} ledgerLike
 */
export const inTheBlack = ledgerLike => {
  const keys = Object.keys(ledgerLike);
  for (let key of keys) {
    if (ledgerLike[key] < 0) return false;
  }
  return true;
};
