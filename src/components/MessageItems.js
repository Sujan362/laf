import React, { Component } from "react";
import MessageItem from "./MessageItem";

export default class MessageItems extends Component {
  render() {
    return this.props.messageList.map((message) => (
      <MessageItem
        key={message.message_id}
        message={message}
        userType={this.props.userType}
      />
    ));
  }
}
