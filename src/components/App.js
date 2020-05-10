import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Polls from "./Polls";
import New from "./New";
import Leader from "./Leader";
import { initData } from "../store/actions/shared";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.initData();
  }

  render() {
    return (
      <Grid padded="vertically" columns={1} centered>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 550 }}>
            <Route exact path="/" render={() => <Polls />} />
            <Route
              path="/login"
              render={() => <Login users={this.props.users} />}
            />
            <Route path="/new" render={() => <New />} />
            <Route path="/leader" render={() => <Leader />} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  questions: state.questions.questions,
});

export default connect(mapStateToProps, { initData })(App);
