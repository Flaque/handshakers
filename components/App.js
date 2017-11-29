import { connect } from "react-redux";
import { shakeHands, buy } from "../actions/index";
import { AutoHandShakers } from "../lib/items";
import { HANDSHAKES } from "../lib/currencies";

const App = ({ wallet, shakeHands, buyAutoHandshaker, autoShakersCost }) => {
  return (
    <div>
      <p>
        <button onClick={shakeHands}>Shake Hands</button>
        <p> {wallet[HANDSHAKES]} Handshakes </p>
      </p>

      <p>
        <button onClick={buyAutoHandshaker}>Buy Auto Handshaker</button>
      </p>
      <p> {wallet[AutoHandShakers.type]} Auto Handshakers </p>
      <p>
        <b> Cost: </b> {autoShakersCost}
      </p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ticks: state.time.ticks || 0,
    wallet: state.app.wallet || {},
    autoShakersCost: -AutoHandShakers.cost(state)[HANDSHAKES]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shakeHands: () => dispatch(shakeHands()),
    buyAutoHandshaker: () => dispatch(buy(AutoHandShakers))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
