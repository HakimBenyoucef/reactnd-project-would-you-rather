import React, { Component } from "react";
import { Segment, Button, Header, Image, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class Question extends Component {
  render() {
    return (
      <Segment.Group>
        <Header
          as="h4"
          block
          attached="top"
          content="Username asks:"
        />
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={5} verticalAlign="middle">
              <Image circular size="medium" src="/images/logo.png" />
            </Grid.Column>

            <Grid.Column width={11}>
              <Header as="h3">Would you rather</Header>
              <p>Question </p>
              <Button primary fluid>View Poll</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}
