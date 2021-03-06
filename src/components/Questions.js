import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Question from "./Question";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Questions extends Component {
  panes = [
    {
      menuItem: "Unanswered Questions",
      render: () => (
        <Tab.Pane attached={false}>
          {this.props.questions &&
            this.getUnanswerdQuestion().map((question) => (
              <Question question={question} key={question.id} />
            ))}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Answered Questions",
      render: () => (
        <Tab.Pane attached={false}>
          {this.props.questions &&
            this.getAnswerdQuestion().map((question) => (
              <Question question={question} key={question.id} />
            ))}
        </Tab.Pane>
      ),
    },
  ];

  getCurrentUser() {
    let userId = this.props.authUser;
    let users = this.props.users;
    if (users) {
      return users.filter((user) => user.id === userId)[0];
    }
  }

  getAnswerdQuestion() {
    let currentUser = this.getCurrentUser();
    if (currentUser) {
      let answers = Object.keys(currentUser.answers);

      return answers
        .map(
          (id) =>
            this.props.questions.filter((question) => question.id === id)[0]
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    }
  }
  getUnanswerdQuestion() {
    if (this.getAnswerdQuestion()) {
      return this.props.questions
        .filter(function (e) {
          return this.indexOf(e) < 0;
        }, this.getAnswerdQuestion())
        .sort((a, b) => b.timestamp - a.timestamp);
    }
  }

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
    users: state.users.users,
    authUser: state.authUser && state.authUser.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(Questions));
