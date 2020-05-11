import React, { Component } from "react";
import NavBar from "./NavBar";
import GridContainer from "./GridContainer";
import { updateQuestions } from "../store/actions/questions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Question from "./Question";

class AnswerToPoll extends Component {
  render() {
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
    questions: state.questions.questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestions: (questions) => dispatch(updateQuestions(questions)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AnswerToPoll));
