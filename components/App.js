import { connect } from "react-redux";
import { shakeHands } from "../actions/index";
import { HANDSHAKES } from "../lib/currencies";

const App = ({ wallet, shakeHands }) => {
  return (
    <div>
      <p>
        <button onClick={shakeHands}>Shake Hands</button> {wallet[HANDSHAKES]}{" "}
        Handshakes
      </p>

      <p>
        <button onClick={shakeHands}>Shake Hands</button>{" "}
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
    shakeHands: () => dispatch(shakeHands())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
