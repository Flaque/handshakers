import React from "react";
import reducers from "../reducers";
import App from "../components/App";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";
import { startClock } from "../actions/index";
import { bindActionCreators } from "redux";
import Centered from "../components/ui/Centered";
import { injectGlobal } from "styled-components";

injectGlobal`
  html, 
  body, 
  #__next,
  body > div:first-child,
  #__next > div:first-child {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
  }
`;

class Page extends React.Component {
  componentDidMount() {
    this.timer = this.props.startClock();
  }

  render() {
    return (
      <Centered>
        <App />
      </Centered>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startClock: bindActionCreators(startClock, dispatch)
  };
};

export default withRedux(initStore, null, mapDispatchToProps)(Page);
