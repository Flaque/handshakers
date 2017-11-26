import { connect } from "react-redux";
import * as unsoldUpgrades from "../lib/Upgrade";

const UpgradeList = () => {
  const ups = Object.values(unsoldUpgrades).map(({ label, costs }) => (
    <li> {label} </li>
  ));

  return <ul> {ups} </ul>;
};

const Upgrades = props => (
  <div>
    <h2>Item Shop</h2>
    <UpgradeList upgrades={props.upgrades} />
  </div>
);

const mapStateToProps = state => {
  return {
    upgrades: state.upgrades
  };
};

export default connect(mapStateToProps)(Upgrades);
