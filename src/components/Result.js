import React, { Component } from "react";
import NavBar from "./NavBar";
import GridContainer from "./GridContainer";
import Question from "./Question";
import { withRouter } from "react-router-dom";

class Result extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <GridContainer>
          <Question
            result={true}
            question={this.props.location.state.question}
          ></Question>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withRouter(Result);
