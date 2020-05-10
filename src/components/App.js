import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Polls from "./Polls";
import New from "./New";
import Leader from "./Leader";
import { initData } from "../store/actions/shared";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.initData();
  }

  render() {
    return (
      <div>
        {this.props.authUser && (
          <React.Fragment>
            <Route path="/login" render={() => <Login />} />
            <Route exact path="/" render={() => <Polls />} />
            <Route path="/new" render={() => <New />} />
            <Route path="/leader" render={() => <Leader />} />
            <Redirect to="/login" />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("authUser " + JSON.stringify(state));
  return {
    authUser: state.authUser.user,
  };
};

export default connect(mapStateToProps, { initData })(App);
