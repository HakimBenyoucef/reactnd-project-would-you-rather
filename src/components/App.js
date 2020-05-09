import React from "react";
import { Grid } from "semantic-ui-react";
import Login from "./Login";

function App() {
  return (
    <Grid padded="vertically" columns={1} centered>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Login />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
