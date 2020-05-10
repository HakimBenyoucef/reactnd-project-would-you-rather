import React, { Component } from "react";
import { Segment, Button, Header, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";

class Question extends Component {
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
              <p>...{this.props.question.optionOne.text}... </p>
              <br />
              <Button primary fluid>
                View Poll
              </Button>
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

export default connect(mapStateToProps, null)(Question);
