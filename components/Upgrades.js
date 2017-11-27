import { connect } from "react-redux";
import * as unsoldUpgrades from "../lib/Upgrade";

const UpgradeItem = ({ upgrade }) => {
  const current = unsoldUpgrades[upgrade.type];

  return (
    <li key={upgrade.type}>
      <span>{upgrade.bought ? "purchased" : ""}</span>
    </li>
  );
};

const UpgradeList = ({ upgrades }) => {
  const ups = Object.values(unsoldUpgrades).map(({ label, costs, type }) => (
    <li key={type}>
      <button> {label} </button>
    </li>
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
