import { ADD_HANDSHAKES, ADD_UPGRADE, PAY } from "../actions/index";
import { initialState } from "../store";

const App = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HANDSHAKES:
      return Object.assign({}, state, {
        handshakes: state.handshakes + action.number
      });
    case ADD_UPGRADE:
      return Object.assign({}, state, {
        upgrades: [...state.upgrades, action.upgrade]
      });
    case PAY: {
      const wallet = state.wallet || {};
      wallet[action.currency] = wallet[action.currency]
        ? wallet[action.currency] - action.cost
        : 0 - action.cost;

      return Object.assign({}, state, {
        wallet: wallet
      });
    }
    default:
      return state;
  }
};

export default App;
