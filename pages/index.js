import React from "react";
import reducers from "../reducers";
import App from "../components/App";
import withRedux from "next-redux-wrapper";
import { initStore } from "../store";

class Page extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  render() {
    return <App />;
  }
}

export default withRedux(initStore, null, null)(Page);
