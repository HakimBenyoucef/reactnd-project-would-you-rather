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

  answerPoll() {}

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
                        value={this.props.question.optionOne.text}
                        checked={
                          this.state.value ===
                          this.props.question.optionOne.text
                        }
                        onChange={this.onChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label={this.props.question.optionTwo.text}
                        name="radioGroup"
                        value={this.props.question.optionTwo.text}
                        checked={
                          this.state.value ===
                          this.props.question.optionTwo.text
                        }
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
  console.log("state= ", state);
  return {
    users: state.users.users,
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
)(withRouter(Question));
