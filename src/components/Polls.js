import React, { Component } from "react";
import { Container, Responsive, Menu, Image, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Questions from "./Questions";

export default class Polls extends Component {
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
                Username
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button
                content="Logout"
                negative
              />
            </Menu.Item>
          </Menu.Menu>
        </Responsive>
        <Questions/>
      </Container>
    );
  }
}
