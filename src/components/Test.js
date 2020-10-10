import React, { Component } from "react";

export default class Test extends Component {
  render() {
    const thistype = this.props.testType;
    console.log(thistype);
    return <div>testing here{thistype}</div>;
  }
}
