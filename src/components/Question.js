import React, { Component } from "react";
import { Segment, Button, Header, Image, Grid, Form } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateQuestions } from "../store/actions/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { updateUsers } from "../store/actions/users";
import Quiz from "./Quiz";
import Result from "./Result";

class Question extends Component {
  state = {
    value: "",
    disabled: this.props.quiz && true,
    isQuiz: false,
    isAnswered: false,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.viewPollDetails = this.viewPollDetails.bind(this);
    this.answerPoll = this.answerPoll.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  answerPoll() {
    let authedUser = this.props.authUser;
    let question = this.props.question;
    _saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer: this.state.value,
    }).then(() => {
      let questions = this.props.questions;
      let users = this.props.users;
      let user = users.filter((user) => user.id === authedUser)[0];
      user.answers = { ...user.answers, [question.id]: this.state.value };
      users = users.filter((user) => user.id !== authedUser).concat([user]);
      this.props.updateUsers([...users]);

      question[this.state.value].votes.push(authedUser);
      questions = questions
        .filter((q) => q.id !== question.id)
        .concat([question]);
      this.props.updateQuestions([...questions]);

      this.showResults();
    });
  }

  viewPollDetails() {
    this.props.history.push("/questions/" + this.props.question.id);
  }

  showResults() {
    this.setState({
      isAnswered: true,
    });
    this.props.history.push("/questions/" + this.props.question.id);
  }

  onChange(e, { value }) {
    this.setState({ value, disabled: false });
  }

  getUser(id) {
    let user = this.props.users.filter((user) => user.id === id)[0];
    return user;
  }

  getScore() {
    let optionOneLength = this.props.question.optionOne.votes.length;
    let optionTwoLength = this.props.question.optionTwo.votes.length;
    let total = optionOneLength + optionTwoLength;
    let percent1 = Math.round((optionOneLength * 100) / total);
    let percent2 = Math.round((optionTwoLength * 100) / total);
    let color1 = percent1 >= 50 ? "green" : "orange";
    let color2 = percent2 >= 50 ? "green" : "orange";
    return {
      total,
      optionOneLength,
      optionTwoLength,
      percent1,
      percent2,
      color1,
      color2,
    };
  }

  render() {
    let user = this.props.question && this.getUser(this.props.question.author);

    return (
      <Segment.Group>
        <Header
          as="h4"
          block
          attached="top"
          content={user && user.name + " asks:"}
        />
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5} verticalAlign="middle">
              <Image circular size="medium" src={user && user.avatarURL} />
            </Grid.Column>

            <Grid.Column width={11}>
              {this.props.answered || this.state.isAnswered ? (
                <Result
                  question={this.props.question}
                  score={this.getScore()}
                  authUser={this.props.authUser}
                />
              ) : (
                <React.Fragment>
                  <Header as="h3">Would you rather</Header>
                  <Form
                    onSubmit={() => {
                      if (this.props.quiz) {
                        this.answerPoll();
                      } else {
                        this.viewPollDetails();
                      }
                    }}
                  >
                    {this.props.quiz ? (
                      <Quiz
                        question={this.props.question}
                        value={this.state.value}
                        onChange={this.onChange}
                      />
                    ) : (
                      <p>...{this.props.question.optionOne.text}... </p>
                    )}
                    <Button primary fluid disabled={this.state.disabled}>
                      View Poll
                    </Button>
                  </Form>
                </React.Fragment>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    questions: state.questions.questions,
    authUser: state.authUser && state.authUser.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestions: (questions) => dispatch(updateQuestions(questions)),
    updateUsers: (users) => dispatch(updateUsers(users)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Question));
