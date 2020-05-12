import React, { Component } from "react";
import GridContainer from "./GridContainer";
import Question from "./Question";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "./NotFound";

class ShowQuestion extends Component {
  state = {
    question: null,
    isAnswered: false,
  };

  componentDidMount() {
    let question = this.getQuestion(this.props.match.params.question_id);
    if (question) {
      let answered = this.isAnsweredQuesiton(question);
      this.setState({ question: question, isAnswered: answered });
    } else {
      return <NotFound/>
    }
  }
  isAnsweredQuesiton(question) {
    let users = this.props.users;
    let user = users.filter((user) => user.id === this.props.authUser)[0];
    return user.answers[question.id];
  }

  getQuestion(quid) {
    let question = this.props.questions.filter((q) => {
      return q.id === quid;
    }).length
      ? this.props.questions.filter((q) => q.id === quid)[0]
      : null;

    return question;
  }

  render() {
    if (!this.state.question) {
      return <NotFound />;
    }
      
    return (
      <React.Fragment>
        <GridContainer>
          <Question
            question={this.state.question}
            answered={this.state.isAnswered}
            quiz={!this.state.isAnswered}
          />
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    authUser: state.authUser && state.authUser.user,
    users: state.users.users,
  };
};

export default connect(mapStateToProps, null)(withRouter(ShowQuestion));
