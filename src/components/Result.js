import React, { Component } from "react";
import NavBar from "./NavBar";
import GridContainer from "./GridContainer";

class Result extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <GridContainer>
          <Question
            resutl={true}
            question={this.props.location.state.question}
          ></Question>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default Result;
