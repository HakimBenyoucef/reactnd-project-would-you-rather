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
import { Redirect } from "react-router-dom";

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
    redirect: false,
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
      this.props.updateQuestions([...questions]);
    });

    this.setState({ redirect: true });
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
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <NavBar />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuestions: (questions) => dispatch(updateQuestions(questions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
