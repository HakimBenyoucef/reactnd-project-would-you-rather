import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Polls from "./Polls";
import New from "./New";
import Leader from "./Leader";
import { initData } from "../store/actions/shared";
import { connect } from "react-redux";
import NotFound from "./NotFound";
import ShowQuestion from "./ShowQuestion";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./NavBar";

class App extends Component {
  componentDidMount() {
    this.props.initData();
  }

  render() {
    return (
      <div>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Polls} />
            <ProtectedRoute path="/add" component={New} />
            <ProtectedRoute path="/leaderboard" component={Leader} />
            <ProtectedRoute
              path="/questions/:question_id"
              component={ShowQuestion}
            />
            <ProtectedRoute component={NotFound} />
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
