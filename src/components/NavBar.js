import React, { Component, Fragment } from "react";
import {
  Container,
  Responsive,
  Menu,
  Image,
  Button,
  Grid,
} from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import { setAuthUser } from "../store/actions/authUser";
import { connect } from "react-redux";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.setAuthUser(undefined);
  }

  render() {
    let user =
      this.props.users &&
      this.props.users.filter((user) => user.id === this.props.authUser)[0];

    return (
      <Container>
        <Responsive as={Menu} minWidth={651} pointing secondary>
          <Menu.Item name="home" as={NavLink} to="/" exact />
          <Menu.Item name="new question" as={NavLink} to="/add" />
          <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />

          {this.props.authUser && (
            <Menu.Menu position="right">
              <Menu.Item>
                <Image
                  src={user && user.avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {user && user.name}
              </Menu.Item>
              <Menu.Item>
                <Button content="Logout" negative onClick={this.logout} />
              </Menu.Item>
            </Menu.Menu>
          )}
        </Responsive>
        <Responsive as={Fragment} minWidth={375} maxWidth={650}>
          <Grid columns={2} padded="vertically">
            {this.props.authUser && (
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src={user && user.avatarURL}
                    avatar
                    spaced="right"
                    verticalAlign="bottom"
                  />
                  {user && user.name}
                </Grid.Column>
                <Grid.Column verticalAlign="bottom" textAlign="right">
                  <Button content="Logout" negative onClick={this.logout} />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column width={16}>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact />
                  <Menu.Item name="new question" as={NavLink} to="/add" />
                  <Menu.Item
                    name="leader board"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive as={Fragment} maxWidth={374}>
          <Grid padded="vertically" columns={1}>
            {this.props.authUser && (
              <Grid.Row>
                <Grid.Column>
                  <Image
                    src={user && user.avatarURL}
                    avatar
                    spaced="right"
                    verticalAlign="bottom"
                  />
                  <Button content="Logout" negative onClick={this.logout} />
                </Grid.Column>
              </Grid.Row>
            )}
            <Grid.Row>
              <Grid.Column>
                <Menu pointing secondary widths={3}>
                  <Menu.Item name="home" as={NavLink} to="/" exact />
                  <Menu.Item name="new question" as={NavLink} to="/add" />
                  <Menu.Item
                    name="leader board"
                    as={NavLink}
                    to="/leaderboard"
                  />
                </Menu>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
