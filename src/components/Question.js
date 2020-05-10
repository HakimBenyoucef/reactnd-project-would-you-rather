import React, { Component } from "react";
import {
  Segment,
  Button,
  Header,
  Image,
  Grid,
  Form,
  Radio,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateQuestions } from "../store/actions/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { updateUsers } from "../store/actions/users";

class Question extends Component {
  state = {
    value: "",
    disabled: true,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.viewPollDetails = this.viewPollDetails.bind(this);
    this.answerPoll = this.answerPoll.bind(this);
  }

  viewPollDetails() {
    this.props.history.push({
      pathname: "/answerTo",
      state: { question: this.props.question },
    });
  }

  answerPoll(e) {
    e.preventDefault();
    let authedUser = this.props.authUser;
    let question = this.props.question;
    console.log(authedUser);
    _saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer: this.state.value,
    }).then(() => {
      let questions = this.props.questions;
      let users = this.props.users;
      let user = users.filter((user) => user.id === authedUser)[0];
      console.log(user);
      user.answers = { ...user.answers, [question.id]: this.state.value };
      users = users.filter((user) => user.id !== authedUser).concat([user]);
      this.props.updateUsers([...users]);

      question[this.state.value].votes.push(authedUser);
      question = questions
        .filter((q) => q.id !== question.id)
        .concat([question]);
      this.props.updateQuestions([...questions]);
    });

    this.props.history.push("/");
  }

  onChange(e, { value }) {
    console.log("value: ", value);
    this.setState({ value, disabled: false });
  }

  getUser(id) {
    console.log("user id = ", id);
    let user = this.props.users.filter((user) => user.id === id)[0];
    return user;
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
              <Header as="h3">Would you rather</Header>
              <Form
                onSubmit={
                  this.props.quiz ? this.answerPoll : this.viewPollDetails
                }
              >
                {this.props.quiz ? (
                  <React.Fragment>
                    <Form.Field>
                      <Radio
                        label={this.props.question.optionOne.text}
                        name="radioGroup"
                        value={"optionOne"}
                        checked={this.state.value === "optionOne"}
                        onChange={this.onChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label={this.props.question.optionTwo.text}
                        name="radioGroup"
                        value={"optionTwo"}
                        checked={this.state.value === "optionTwo"}
                        onChange={this.onChange}
                      />
                    </Form.Field>
                  </React.Fragment>
                ) : (
                  <p>...{this.props.question.optionOne.text}... </p>
                )}
                <Button primary fluid>
                  View Poll
                </Button>
              </Form>
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
