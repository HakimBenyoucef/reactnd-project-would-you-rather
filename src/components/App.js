import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Polls from "./Polls";
import New from "./New";
import Leader from "./Leader";
import { initData } from "../store/actions/shared";
import { connect } from "react-redux";
import AnswerToPoll from "./AnswerToPoll";
import Result from "./Result";
import NotFound from "./NotFound";

class App extends Component {
  componentDidMount() {
    this.props.initData();
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Polls} />
            <Route path="/add" component={New} />
            <Route path="/leaderboard" component={Leader} />
            <Route path="/answerTo" component={AnswerToPoll} />
            <Route path="/result" component={Result} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser && state.authUser.user,
  };
};

export default connect(mapStateToProps, { initData })(App);
