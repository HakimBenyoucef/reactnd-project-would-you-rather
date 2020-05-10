import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Question from "./Question";
import { connect } from "react-redux";

class Questions extends Component {
  panes = [
    {
      menuItem: "Unanswered Questions",
      render: () => (
        <Tab.Pane attached={false}>
          {this.props.questions &&
            this.props.questions.map((question) => (
              <Question question={question} key={question.optionOne.text} />
            ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered Questions",
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
  ];
  render() {
    return (
      <Tab
        menu={{ fluid: true, tabular: true, pointing: true }}
        panes={this.panes}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
  };
};

export default connect(mapStateToProps, null)(Questions);
