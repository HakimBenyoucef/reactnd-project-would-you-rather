import React from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import Login from "./Login";
import Polls from "./Polls";

function App() {
  return (
    <Grid padded="vertically" columns={1} centered>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 550 }}>
        <Route
          exact
          path="/"
          render={() => (
            <Polls/>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <Login />
          )}
        />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;