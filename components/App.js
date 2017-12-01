import { connect } from "react-redux";
import { shakeHands, buyItem } from "../actions/index";
import { HANDSHAKES } from "../lib/currencies";
import { Map } from "immutable";
import * as pouch from "../lib/pouch";

const get = (wallet, type) => {
  if (!Map.isMap(wallet)) {
    return 0;
  }

  return Math.ceil(wallet.get(type)) || 0;
};

const AutoShakers = ({ wallet, buy }) => [
  <button key="auto-shaker-button" onClick={() => buy(pouch.AutoHandShakers)}>
    Buy AutoHandshakers
  </button>,
  <p key="auto-shaker-p">
    {get(wallet, pouch.AutoHandShakers.type)} AutoHandshakers
  </p>
];

const App = ({ wallet, ticks, shakeHands, buy, shown }) => {
  return (
    <div>
      <button onClick={shakeHands}>Shake Hands</button>
      <p>{get(wallet, HANDSHAKES)} Handshakes</p>

      {shown.includes(pouch.AutoHandShakers.type) && (
        <AutoShakers wallet={wallet} buy={buy} />
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ticks: state.time.ticks || 0,
    wallet: state.app.wallet,
    shown: state.app.shown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shakeHands: () => dispatch(shakeHands()),
    buy: item => dispatch(buyItem(item.type))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
