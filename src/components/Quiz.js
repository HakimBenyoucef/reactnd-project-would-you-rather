import React, { Component } from "react";
import { Form, Radio } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class Quiz extends Component {
  render() {
    return (
      <React.Fragment>
        <Form.Field>
          <Radio
            label={this.props.question.optionOne.text}
            name="radioGroup"
            value={"optionOne"}
            checked={this.props.value === "optionOne"}
            onChange={this.props.onChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label={this.props.question.optionTwo.text}
            name="radioGroup"
            value={"optionTwo"}
            checked={this.props.value === "optionTwo"}
            onChange={this.props.onChange}
          />
        </Form.Field>
      </React.Fragment>
    );
  }
}
