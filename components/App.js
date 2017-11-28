import { connect } from "react-redux";
import { shakeHands, buyFollower } from "../actions/index";

const App = props => {
  return (
    <div>
      <button onClick={props.shakeHands}> Shake Hands</button>

      {props.handshakes > 10 && (
        <button onClick={props.buyFollower}> Buy Follower </button>
      )}

      <p> {props.handshakes && <span>{props.handshakes} Handshakes</span>} </p>
      <p> {props.followers && <span>{props.followers} Followers</span>} </p>
      <p>
        {props.autoHandshakers && (
          <span>{props.autoHandshakers} Volunteer Handshakers </span>
        )}
      </p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    ticks: state.time.ticks,
    handshakes: state.wallet.handshakes,
    followers: state.wallet.followers,
    autoHandshakers: state.pouch.autoHandshakers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shakeHands: () => {
      dispatch(shakeHands());
    },
    buyFollower: () => {
      dispatch(buyFollower());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
