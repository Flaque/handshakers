import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addHandshakes } from "../actions";
import Volunteers from "./Volunteers";
import {FOLLOWERS_NEEDED_FOR_VOLUNTEERS} from "../constants";

const App = props => {
  return (
  <div>
    <button onClick={() => {props.addHandshakes(1)}} >Shake Hand</button>

    <p> {props.handshakes !== 0 && <b> {props.handshakes} Followers </b>} </p>
  
    {props.handshakes > FOLLOWERS_NEEDED_FOR_VOLUNTEERS &&
      <Volunteers />
    } 
  </div>
);}

function mapStateToProps(state) {
  return {
    handshakes: state.handshakes
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addHandshakes: bindActionCreators(addHandshakes, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
