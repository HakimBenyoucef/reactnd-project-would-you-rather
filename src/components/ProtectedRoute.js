import React from "react";
import { withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login";

class ProtectedRoute extends React.Component {
  render() {
    const isAuthenticated = this.props.authUser;
    const props = Object.assign( {}, this.props );

    return isAuthenticated ? (
        <Route {...props}/>
      ) : (
        <Login />
      );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser && state.authUser.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(ProtectedRoute));
