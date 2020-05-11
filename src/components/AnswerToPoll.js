import React, { Component } from "react";
import NavBar from "./NavBar";
import GridContainer from "./GridContainer";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import Question from "./Question";

class AnswerToPoll extends Component {
  render() {
    if (!this.props.authUser) {
        return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <NavBar />
        <GridContainer>
          <Question
            quiz={true}
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

export default connect(mapStateToProps, null)(withRouter(AnswerToPoll));
