import { connect } from "react-redux";

const App = ({ wallet, ticks }) => {
  return <div>{ticks}</div>;
};

function mapStateToProps(state) {
  return {
    ticks: state.time.ticks || 0,
    wallet: state.app.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
