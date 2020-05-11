import React, { Component } from "react";
import {
  Segment,
  Button,
  Header,
  Image,
  Grid,
  Form,
  Radio,
  Card,
  Icon,
  Progress,
  Label,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateQuestions } from "../store/actions/questions";
import { _saveQuestionAnswer } from "../utils/_DATA";
import { updateUsers } from "../store/actions/users";

const Quiz = ({ question, value, onChange }) => {
  return (
    <React.Fragment>
      <Form.Field>
        <Radio
          label={question.optionOne.text}
          name="radioGroup"
          value={"optionOne"}
          checked={value === "optionOne"}
          onChange={onChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label={question.optionTwo.text}
          name="radioGroup"
          value={"optionTwo"}
          checked={value === "optionTwo"}
          onChange={onChange}
        />
      </Form.Field>
    </React.Fragment>
  );
};

const Result = ({ question, score }) => {
  return (
    <React.Fragment>
      <Header as="h2">
        <Header.Content>Results</Header.Content>
        <Header.Subheader>Would you rather:</Header.Subheader>
      </Header>
      <Card fluid>
        <Card.Content>
          <Card.Header>{question.optionOne.text}</Card.Header>
          <Card.Description>
            <Progress percent={score.percent1} progress color={score.color1} />
          </Card.Description>
          <Label as="a" image>
            <img src="/images/hakim.png" />
            Your vote
          </Label>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          {score.optionOneLength} / {score.total}
        </Card.Content>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Header>{question.optionTwo.text}</Card.Header>
          <Card.Description>
            <Progress percent={score.percent2} progress color={score.color2} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          {score.optionTwoLength} / {score.total}
        </Card.Content>
      </Card>
    </React.Fragment>
  );
};
class Question extends Component {
  state = {
    value: "",
    disabled: this.props.quiz && true,
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.viewPollDetails = this.viewPollDetails.bind(this);
    this.answerPoll = this.answerPoll.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  viewPollDetails() {
    this.props.history.push({
      pathname: "/answerTo",
      state: { question: this.props.question },
    });
  }

  answerPoll() {
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

  showResults() {
    this.props.history.push({
      pathname: "/result",
      state: { question: this.props.question },
    });
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
              {this.props.result ? (
                <Result
                  question={this.props.question}
                  score={this.getScore()}
                />
              ) : (
                <React.Fragment>
                  <Header as="h3">Would you rather</Header>
                  <Form
                    onSubmit={() => {
                      if (this.props.quiz) {
                        this.answerPoll();
                      } else if (this.props.answered) {
                        this.showResults();
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
                      {this.props.answered ? "Results" : "View Poll"}
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
