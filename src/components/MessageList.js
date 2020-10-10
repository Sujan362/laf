import React, { Component } from "react";
import Messages from "./Messages";

export default class MessageList extends Component {
  render() {
    return this.props.messageList.map((messages) => (
      <Messages
        key={messages.message_id}
        messages={messages}
        userType={this.props.userType}
      />
    ));
  }
}
