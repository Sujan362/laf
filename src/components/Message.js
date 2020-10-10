import React, { Component } from "react";
import MessageItems from "./MessageItems";
import axios from "axios";

export default class Message extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    const uid = this.props.uid;
    const itemId = this.props.itemId;
    axios
      .get(`/messages/itemMessage?uid=${uid}&itemId=${itemId}`)
      .then((res) => this.setState({ messages: res.data }));
  }
  render() {
    return <MessageItems messages={this.state.messages} />;
  }
}
