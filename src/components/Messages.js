import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageFinal from "./MessageFinal.js";

export default class Messages extends Component {
  state = {
    itemInfo: [],
    messageInfo: {
      messageText: this.props.messages.message_text,
      messageDate: this.props.messages.date,
      studentId: this.props.messages.student_id,
      count: this.props.messages.count,
    },
  };

  componentDidMount() {
    const itemId = this.props.messages.item_id;
    var url = `/laf/${itemId}`;
    axios.get(`${url}`).then((res) => this.setState({ itemInfo: res.data }));
  }
  render() {
    var image = "../assets/images/";
    image = image + this.state.itemInfo.item_image;
    return (
      <React.Fragment>
        <MessageFinal
          itemInfo={this.state.itemInfo}
          messageInfo={this.state.messageInfo}
          userType={this.props.userType}
        />
      </React.Fragment>
    );
  }
}
