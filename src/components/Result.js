import React, { Component } from "react";
import { Header, Card, Icon, Progress, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class Result extends Component {
  render() {
    return (
      <React.Fragment>
        <Header as="h2">
          <Header.Content>Results</Header.Content>
          <Header.Subheader>Would you rather:</Header.Subheader>
        </Header>
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.question.optionOne.text}</Card.Header>
            <Card.Description>
              <Progress
                percent={this.props.score.percent1}
                progress
                color={this.props.score.color1}
              />
            </Card.Description>
            {this.props.question.optionOne.votes.includes(this.props.authUser) && (
              <Label as="a" image>
                <img
                  src={"/images/" + this.props.authUser + ".png"}
                  alt={this.props.authUser}
                />
                Your vote
              </Label>
            )}
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            {this.props.score.optionOneLength} / {this.props.score.total}
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.question.optionTwo.text}</Card.Header>
            <Card.Description>
              <Progress
                percent={this.props.score.percent2}
                progress
                color={this.props.score.color2}
              />
            </Card.Description>
            {this.props.question.optionTwo.votes.includes(
              this.props.authUser
            ) && (
              <Label as="a" image>
                <img
                  src={"/images/" + this.props.authUser + ".png"}
                  alt={this.props.authUser}
                />
                Your vote
              </Label>
            )}
          </Card.Content>
          <Card.Content extra>
            <Icon name="user" />
            {this.props.score.optionTwoLength} / {this.props.score.total}
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
}
