import React, { Component } from "react";
import {
  Segment,
  Header,
  Grid,
  Form,
  Input,
  Divider,
  Button,
} from "semantic-ui-react";
import NavBar from "./NavBar";
import GridContainer from "./GridContainer";
import { updateQuestions } from "../store/actions/questions";
import { connect } from "react-redux";
import { _saveQuestion } from "../utils/_DATA";
import { withRouter } from "react-router-dom";
import Question from "./Question";

class AnswerToPoll extends Component {

  constructor(props) {
    super(props);
    this.onChangeText1 = this.onChangeText1.bind(this);
    this.onChangeText2 = this.onChangeText2.bind(this);
    this.answerQuestion = this.answerQuestion.bind(this);
  }
  state = {};

  answerQuestion(e) {
    e.preventDefault();
    let authUser = this.props.authUser;
    let question = {
      optionOneText: this.state.optionOne,
      optionTwoText: this.state.optionTwo,
      author: authUser,
    };
    _saveQuestion(question).then((formatedQuestion) => {
      let questions = this.props.questions;
      questions.push(formatedQuestion);
      this.props.updateQuestions([...questions]);
    });

    this.props.history.push("/");
  }

  onChangeText1(e) {
    this.setState({
      optionOne: e.target.value,
    });
  }

  onChangeText2(e) {
    this.setState({
      optionTwo: e.target.value,
    });
  }

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
