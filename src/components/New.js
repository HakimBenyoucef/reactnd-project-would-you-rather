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

export default class New extends Component {
  render() {
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
                <Form onSubmit={this.handleSubmit}>
                  <Input fluid required placeholder="Option 1" />
                  <Divider horizontal>Or</Divider>
                  <Input fluid required placeholder="Option 2" />
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
