import React, { Component } from "react";
import {
  Grid,
  Image,
  Segment,
  Divider,
  Header,
  Label,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import GridContainer from "./GridContainer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const getUserScore = (user) => {
  let answered = Object.keys(user.answers).length;
  let created = user.questions.length;
  let score = answered + created;
  return { answered, created, score };
};

const colors = ["yellow", "grey", "orange"];

class Leader extends Component {
  compare(user1, user2) {
    let score1 = getUserScore(user1).score;
    let score2 = getUserScore(user2).score;
    if (score1 < score2) {
      return 1;
    }
    if (score1 > score2) {
      return -1;
    }
    return 0;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.users.sort(this.compare).map((user, index) => (
          <GridContainer key={user.id}>
            {index < 3 && (
              <Label corner="left" icon="trophy" color={colors[index]} />
            )}
            <Segment.Group>
              <Grid divided padded>
                <Grid.Row>
                  <Grid.Column width={4} verticalAlign="middle">
                    <Image circular size="small" src={user.avatarURL} />
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <Header as="h2">{user.name}</Header>
                    <Grid>
                      <Grid.Column width={12}>Answered questions</Grid.Column>
                      <Grid.Column width={4}>
                        {getUserScore(user).answered}
                      </Grid.Column>
                    </Grid>
                    <Divider />
                    <Grid>
                      <Grid.Column width={12}>Created questions</Grid.Column>
                      <Grid.Column width={4}>
                        {getUserScore(user).created}
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Segment.Group>
                      <Header
                        as="h4"
                        block
                        textAlign="center"
                        attached="top"
                        content="Score"
                      />
                      <Grid textAlign="center" padded>
                        <Grid.Column verticalAlign="middle">
                          <Label circular color="green" size="big">
                            {getUserScore(user).score}
                          </Label>
                        </Grid.Column>
                      </Grid>
                    </Segment.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment.Group>
          </GridContainer>
        ))}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, null)(withRouter(Leader));
