import React, { Component } from "react";
import { Container} from "semantic-ui-react";
import Questions from "./Questions";
import GridContainer from "./GridContainer";

export default class Polls extends Component {
  render() {
    return (
      <Container>
        <GridContainer>
          <Questions />
        </GridContainer>
      </Container>
    );
  }
}
