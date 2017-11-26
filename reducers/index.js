import { ADD_HANDSHAKES } from "../actions/index";
import { initialState } from "../store";

const App = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HANDSHAKES:
      return Object.assign({}, state, {
        handshakes: state.handshakes + action.number
      });
    default:
      return state;
  }
};

export default App;
