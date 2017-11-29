import { connect } from "react-redux";
import { shakeHands, buy } from "../actions/index";
import { AutoHandShakers } from "../lib/items";
import { HANDSHAKES } from "../lib/currencies";

const App = ({ wallet, shakeHands, buyAutoHandshaker }) => {
  return (
    <div>
      <p>
        <button onClick={shakeHands}>Shake Hands</button> {wallet[HANDSHAKES]}{" "}
        Handshakes
      </p>

      <p>
        <button onClick={buyAutoHandshaker}>Buy Auto Handshaker</button>
        {wallet[AutoHandShakers.type]} Auto Handshakers
      </p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ticks: state.time.ticks || 0,
    wallet: state.app.wallet || {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shakeHands: () => dispatch(shakeHands()),
    buyAutoHandshaker: () => dispatch(buy(AutoHandShakers))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
