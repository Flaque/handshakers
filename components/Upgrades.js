import { connect } from "react-redux";
import * as unsoldUpgrades from "../lib/Upgrade";
import { buyUpgrade } from "../actions/index";
import { bindActionCreators } from "redux";

const UpgradeItem = ({ upgrade, buy }) => {
  const current = unsoldUpgrades[upgrade.type];

  return (
    <div key={upgrade.type}>
      <label>
        {upgrade.label}
        {upgrade.purchased ? (
          <span>{"[purchased]"}</span>
        ) : (
          <button
            onClick={() => {
              buy(upgrade);
            }}
          >
            {"buy"}
          </button>
        )}
      </label>
    </div>
  );
};

const UpgradeList = ({ upgrades, buy }) => {
  const ups = Object.values(unsoldUpgrades).map(upgrade => (
    <UpgradeItem upgrade={upgrade} buy={buy} />
  ));

  return <div> {ups} </div>;
};

const Upgrades = props => (
  <div>
    <h2>Item Shop</h2>
    <UpgradeList {...props} />
  </div>
);

const mapStateToProps = state => {
  return {
    upgrades: state.upgrades
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buy: bindActionCreators(buyUpgrade, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upgrades);
