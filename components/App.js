import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addHandshakesWithClick } from "../actions";
import Volunteers from "./Volunteers";
import Upgrades from "./Upgrades";
import {
  FOLLOWERS_NEEDED_FOR_VOLUNTEERS,
  FOLLOWERS_NEEDED_FOR_UPGRADES
} from "../constants";
import { FOLLOWERS } from "../lib/Currency";

const App = props => {
  return (
    <div>
      <button
        onClick={() => {
          props.addHandshakes();
        }}
      >
        Shake Hand
      </button>

      <p> {props.followers !== 0 && <b> {props.followers} Followers </b>} </p>
      {props.followers > FOLLOWERS_NEEDED_FOR_UPGRADES && <Upgrades />}

      {props.followers > FOLLOWERS_NEEDED_FOR_VOLUNTEERS && <Volunteers />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    followers: state.wallet[FOLLOWERS]
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addHandshakes: bindActionCreators(addHandshakesWithClick, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
