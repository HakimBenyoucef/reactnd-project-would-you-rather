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
import GridContainer from "./GridContainer";
import { updateQuestions } from "../store/actions/questions";
import { connect } from "react-redux";
import { _saveQuestion } from "../utils/_DATA";
import { withRouter } from "react-router-dom";
import { updateUsers } from "../store/actions/users";

class New extends Component {
  constructor(props) {
    super(props);
    this.onChangeText1 = this.onChangeText1.bind(this);
    this.onChangeText2 = this.onChangeText2.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
  }
  state = {
    optionOne: "",
    optionTwo: "",
  };

    addNewQuestion(e) {
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

        let users = this.props.users;
        let user = users.filter((user) => user.id === authUser)[0];
        user.questions.push(formatedQuestion.id);
        users = users.filter((user) => user.id !== authUser).concat([user])
        this.props.updateUsers([...users]);
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
        <GridContainer>
          <Segment.Group>
            <Header as="h3" block attached="top" textAlign="center">
              <Header.Content>Create a new question</Header.Content>
            </Header>
            <Grid padded>
              <Grid.Column width={16}>
                <p>Complete the question</p>
                <p>
                  <strong>Would you rather...</strong>
                </p>
                <Form onSubmit={this.addNewQuestion}>
                  <Input
                    fluid
                    required
                    placeholder="Option 1"
                    value={this.state.optionOne}
                    onChange={this.onChangeText1}
                  />
                  <Divider horizontal>Or</Divider>
                  <Input
                    fluid
                    required
                    placeholder="Option 2"
                    value={this.state.optionTwo}
                    onChange={this.onChangeText2}
                  />
                  <br />
                  <Button primary fluid>
                    Submit
                  </Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Segment.Group>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser && state.authUser.user,
    questions: state.questions.questions,
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestions: (questions) => dispatch(updateQuestions(questions)),
    updateUsers: (users) => dispatch(updateUsers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(New));
