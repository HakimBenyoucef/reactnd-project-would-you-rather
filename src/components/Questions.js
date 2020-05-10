import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import Question from "./Question";

const panes = [
  {
    menuItem: "Unanswered Questions",
    render: () => <Tab.Pane attached={false}><Question/></Tab.Pane>,
  },
  {
    menuItem: "Answered Questions",
    render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
  },
];

export default class Questions extends Component {
  render() {
    return (
      <Tab
        menu={{ fluid: true, tabular: true, pointing: true  }}
        panes={panes}
      />
    );
  }
}
