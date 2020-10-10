import React, { Component } from "react";
import "../assets/css/Inbox.css";
import axios from "axios";
import MessageList from "./MessageList";
import Message from "./Message";

export default class Inbox extends Component {
  state = {
    messageList: [],
  };

  componentDidMount() {
    const uid = this.props.uid;
    var url = "";
    if (this.props.userType === "ADMIN") {
      url = `/messages/getAdminMessage`;
    } else {
      url = `/messages/getmessagetest?uid=${uid}`;
    }
    axios.get(`${url}`).then((res) => this.setState({ messageList: res.data }));
    const interval = setInterval(() => {
      this.updateMessageList();
    }, 1000);
    return () => clearInterval(interval);
  }

  updateMessageList = () => {
    const uid = this.props.uid;
    var url = "";
    if (this.props.userType === "ADMIN") {
      url = `/messages/getAdminMessage?uid=${uid}`;
    } else {
      url = `/messages/getmessagetest?uid=${uid}`;
    }
    axios.get(`${url}`).then((res) => this.setState({ messageList: res.data }));
  };

  render() {
    return (
      <React.Fragment>
        <MessageList
          messageList={this.state.messageList}
          userType={this.props.userType}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    );
  }
}
