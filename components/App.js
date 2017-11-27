import { connect } from "react-redux";
import { shakeHands } from "../actions/index";

const App = props => {
  return (
    <div>
      <button onClick={props.shakeHands}> Shake Hands</button>

      <p> {props.handshakes && <span>{props.handshakes} Handshakes</span>} </p>
      <p> {props.followers && <span>{props.followers} Followers</span>} </p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ticks: state.time.ticks,
    handshakes: state.wallet.handshakes,
    followers: state.wallet.followers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shakeHands: () => {
      dispatch(shakeHands());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
