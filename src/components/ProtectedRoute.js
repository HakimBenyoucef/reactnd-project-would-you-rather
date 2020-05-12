import React from "react";
import { Redirect, withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends React.Component {
  render() {
    const isAuthenticated = this.props.authUser;
    const props = Object.assign( {}, this.props );

    return isAuthenticated ? (
      <Route {...props}/>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser && state.authUser.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(ProtectedRoute));
