# Overview

## Currency

A currency is a name for a number value. For example, in cookie-clicker, the
currency is cookies. But you could have many currencies, like "gold" or
"apples".

## Wallet

A wallet is the current state of all currencies in the system.

An example wallet might look like:

```js
const wallet = {
  Cookies: 5,
  Dogs: 6,
  Buzzballs: 3045
};
```

## Ledger

A ledger is a collection of _updates_ to the current wallet. In structure, it
looks very similar to a wallet.

```js
const ledger = {
  Cookies: -5,
  Dogs: 10
};
```

### Adding ledgers

A ledger can be added to another ledger by combining the the map. Note that
we're always creating a new item, not updating the old one.

```js
const newLedger = add(ledgerOne, ledgerTwo);
```

### Adding to a wallet

Similarly, a ledger can be added to a wallet.

```js
const newWallet = add(wallet, ledger);
```

### A "main" ledger

For optimization, all ledgers can be combined and cached into a main ledger that
stores the total amount of updates needed to be applied.

```js
const mainLedger = add(...ledgers);
```

## Ticks

A tick is a period of time before between updates. You can set the time at any
number, it does not need to be a second. I like to choose `800` miliseconds.

### Tick Updating

It's common to update the wallet on a tick by adding it with the ledger like so:

```js
onTick(wallet => {
  return add(wallet, ledger);
});
```

## Items

Items are objects that contain functions that return ledgers.

```js
const Fizz = {
    buzz = (state) => {
        return {
            dorkle: state.dorkleValue + 5
        };
    }
}
```

### Buyable Items

Buyable items have a `cost` function.

```js
const Apple = {
    cost = (state) => {
        return {
            dollar: state.marketValue + state.markup
        };
    }
}
```

### Tick Effect Items

Items that added to the tick ledger have a `tick` function.

```js
const Investment = {
    tick = (state) => {
        return {
            dollar: state.stockmarketAverage
        }
    }
}
```

### General properties

Items can have any property you would like to add to them and that property can
be accessed in the functions.

```js
const Foo = {
    baseCost : 5,
    cost = (state) => {
        return {
            dollar: state.markup + this.baseCost
        }
    }
}
```

### Item Currencies

Items are more like blueprints, not state containers. Therefore if you would
like to have more than one item, you may want to use the wallet to store the
amount of an item and then pass that into the item's ledger functions.

For example:

```js
// wallet
const wallet = {
    Investments: 5
}

// Items
const Investments = {
    tick = (state) => {
        return {
            dollar: state.stockmarketAverage * state.wallet.Investments
        }
    }
}
```

## With redux

This system doesn't require redux, but it plays nicely with it. It does assume
_some_ sort of state management though.

A general example with Redux might look like this:

```js
const items = {
    Investments: {
        tick = (state) => {
            return {
                dollar: 5 * state.wallet.Investments
            }
        }
    }
}

// Actions
const ADD_LEDGER = "ADD_LEDGER";
const UPDATE_WALLET = "UPDATE_WALLET";
const SET_LEDGER = "SET_LEDGER";

// Action creators
const addLedger = (ledger) => {
  return { type: ADD_LEDGER, ledger: ledger};
}

const updateWallet = () => {
  return { type: UPDATE_WALLET };
};

const startTicker = () => dispatch => {
  return setInterval(() => dispatch(updateWallet()), 800);
};

const generateLedger = () => (dispatch, getState) => {
  // Loop through all items and get each items "tick" ledger
  const ledgers = Object.keys(getState().wallet).map(name => {
    return items[keys].tick(getState());
  });

  const mainLedger = add(...ledgers);
  dispatch({ type: SET_LEDGER, ledger: mainLedger });
};

// Initial State
const initialState = { wallet: {}, ledger: {}, items: [] };

// Reducers
const App = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LEDGER:
      return Object.assign({}, state, {
        wallet: add(state.wallet, action.ledger)
      });
    case UPDATE_WALLET:
      return Object.assign({}, state, {
        wallet: add(state.wallet, state.ledger)
      });
    case SET_LEDGER:
      return Object.assign({}, state, {
        ledger: action.ledger
      });
    default:
      return state;
  }
};
```
