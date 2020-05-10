import React, { Component } from "react";
import { Container, Responsive, Menu, Image, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
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
          <Menu.Item name="new question" as={NavLink} to="/new" />
          <Menu.Item name="leader board" as={NavLink} to="/leader" />
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
