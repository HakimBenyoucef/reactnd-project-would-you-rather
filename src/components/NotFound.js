import React, { Component } from "react";
import { Image } from "semantic-ui-react";

export default class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <Image src="/images/404.jpg" fluid/>
      </React.Fragment>
    );
  }
}
