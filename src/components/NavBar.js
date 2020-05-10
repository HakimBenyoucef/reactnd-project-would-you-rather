import React, { Component } from "react";
import { Container, Responsive, Menu, Image, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import setAuthUser from "../store/actions/authUser";
import { connect } from "react-redux";

class NavBar extends Component {
  logout() {}
  render() {
    return (
      <Container>
        <Responsive as={Menu} minWidth={651} pointing secondary>
          <Menu.Item name="home" as={NavLink} to="/" exact />
          <Menu.Item name="new question" as={NavLink} to="/new" />
          <Menu.Item name="leader board" as={NavLink} to="/leader" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  src={"/images/logo.png"}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {this.props.users &&
                  this.props.users.filter(
                    (user) => user.id === this.props.authUser
                  )[0].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button content="Logout" negative />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthUser: (userId) => dispatch(setAuthUser(userId)),
  };
};

export default connect(null, mapDispatchToProps)(NavBar);
