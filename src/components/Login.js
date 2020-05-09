import React, { Component } from "react";
import {
  Segment,
  Header,
  Grid,
  Dimmer,
  Loader,
  Image,
  Form,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <Segment.Group>
          <Header as="h4" block attached="top" textAlign="center">
            <Header.Content>
              Welcome to the Would You Rather App!
            </Header.Content>
            <Header.Subheader>Please sign in to continue</Header.Subheader>
          </Header>
          <Grid padded textAlign="center">
            <Grid.Row>
              <Grid.Column width={16}>
                {false && (
                  <Dimmer active inverted>
                    <Loader inverted content="Loading" />
                  </Dimmer>
                )}
                <Image src="/images/logo.png" size="medium" centered />
                <br />
                <Form onSubmit={this.handleSubmit}>
                  <Header as="h2" color="blue">
                    Sign In
                  </Header>
                  <Form.Dropdown
                    placeholder="Select a Friend"
                    fluid
                    selection
                    scrolling
                    value={""}
                    required
                  />
                  <Form.Button content="Login" primary disabled={false} fluid />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment.Group>
        <footer
          style={{
            textAlign: "center",
          }}
        >
          <a href="https://www.freepik.com/free-photos-vectors/people">
            People vector created by freepik - www.freepik.com
          </a>
        </footer>
      </React.Fragment>
    );
  }
}
