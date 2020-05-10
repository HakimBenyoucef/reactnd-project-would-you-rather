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

class Question extends Component {
  state = {
    value: "",
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    console.log("onSubmit 0 -->");
    if (!this.props.quiz) {
      console.log("onSubmit 1 -->");
      this.props.history.push({
        pathname: "/answerTo",
        state: { question: this.props.question },
      });
    }
  }
  onChange() {}
  getUser(id) {
    return this.props.users.filter((user) => user.id === id)[0];
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
              <Form onSubmit={this.onSubmit}>
                {this.props.quiz ? (
                  <React.Fragment>
                    <Form.Field>
                      <Radio
                        label={
                          this.props.question &&
                          this.props.question.optionOne.text
                        }
                        name="radioGroup"
                        value={this.state.value}
                        checked={
                          this.props.question &&
                          this.state.value ===
                            this.props.question.optionOne.text
                        }
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Radio
                        label={
                          this.props.question &&
                          this.props.question.optionTwo.text
                        }
                        name="radioGroup"
                        value={this.state.value}
                        checked={
                          this.props.question &&
                          this.state.value ===
                            this.props.question.optionTwo.text
                        }
                        onChange={this.handleChange}
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
  };
};

export default connect(mapStateToProps, null)(withRouter(Question));
