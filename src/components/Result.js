import React, { Component } from "react";
import NavBar from "./NavBar";
import GridContainer from "./GridContainer";
import Question from "./Question";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Result extends Component {
  render() {
    if (!this.props.authUser) {
      this.props.history.push("/login");
      return <React.Fragment />;
    }
    return (
      <React.Fragment>
        <NavBar />
        <GridContainer>
          <Question
            result={true}
            question={this.props.location.state.question}
          ></Question>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser && state.authUser.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(Result));
