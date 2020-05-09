import React, { Component } from "react";
import {
  Grid,
  Image,
  Segment,
  Divider,
  Header,
  Label,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class Leader extends Component {
  render() {
    return (
      <Segment.Group>
        <Grid divided padded>
          <Grid.Row>
            <Grid.Column width={4} verticalAlign="middle">
              <Image circular size="small" src="/images/logo.png" />
            </Grid.Column>

            <Grid.Column width={8}>
              <Header as="h2">Username</Header>
              <Grid>
                <Grid.Column width={12}>Answered questions</Grid.Column>
                <Grid.Column width={4}>3</Grid.Column>
              </Grid>
              <Divider />
              <Grid>
                <Grid.Column width={12}>Created questions</Grid.Column>
                <Grid.Column width={4}>3</Grid.Column>
              </Grid>
            </Grid.Column>

            <Grid.Column width={4}>
              <Segment.Group>
                <Header
                  as="h4"
                  block
                  textAlign="center"
                  attached="top"
                  content="Score"
                />
                <Grid textAlign="center" padded>
                  <Grid.Column verticalAlign="middle">
                    <Label circular color="green" size="big">
                      6
                    </Label>
                  </Grid.Column>
                </Grid>
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    );
  }
}
