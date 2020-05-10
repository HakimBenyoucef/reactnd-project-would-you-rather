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
import { connect } from "react-redux";
import { setAuthUser } from "../store/actions/authUser";
import { Redirect } from "react-router-dom";
import GridContainer from "./GridContainer";

class Login extends Component {
  state = {
    userId: "",
    redirect: false,
    disabled: true,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.setAuthUser(this.state.userId);
    this.setState({ redirect: true });
  }

  onChange(e, { value }) {
    this.setState({ userId: value, disabled: false });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <GridContainer>
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
                  <Form onSubmit={this.onSubmit}>
                    <Header as="h2" color="blue">
                      Sign In
                    </Header>
                    <Form.Dropdown
                      placeholder="Select a Friend"
                      fluid
                      selection
                      scrolling
                      value={this.state.userId}
                      required
                      onChange={this.onChange}
                      options={
                        (this.props.users &&
                          this.props.users.map((user) => ({
                            key: user.id,
                            text: user.name,
                            value: user.id,
                            image: { avatar: true, src: user.avatarURL },
                          }))) ||
                        []
                      }
                    />
                    <Form.Button
                      content="Login"
                      primary
                      fluid
                      disabled={this.state.disabled}
                    />
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
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    authUser: state.authUser && state.authUser.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUser: (userId) => dispatch(setAuthUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
