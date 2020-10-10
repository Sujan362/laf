import React, { Component } from "react";
import Moment from "react-moment";
import Axios from "axios";

export default class MessageItem extends Component {
  render() {
    var styleClass = "";
    var imgSrc = "";
    const sender = this.props.message.message_sender;
    const user = this.props.userType;
    const message = this.props.message.message_text;
    const date = this.props.message.date;
    const readStatus = this.props.message.read_status;
    const messageId = this.props.message.message_id;
    if (sender === user) {
      styleClass = "self";
      imgSrc = "https://i.imgur.com/HYcn9xO.png";
    } else {
      styleClass = "other";
      imgSrc = "https://i.imgur.com/DY6gND0.png";
    }
    if (user === "STUDENT" && sender === "ADMIN" && readStatus === "UNREAD") {
      const url = `/messages/updateUnread?messageId=${messageId}`;
      Axios.put(`${url}`).then((res) => console.log(res.data));
    }
    if (user === "ADMIN" && sender === "STUDENT" && readStatus === "UNREAD") {
      const url = `/messages/updateUnread?messageId=${messageId}`;
      Axios.put(`${url}`).then((res) => console.log(res.data));
    }

    return (
      <React.Fragment>
        <li class={styleClass}>
          <div class="avatar">
            <img src={imgSrc} draggable="false" />
          </div>
          <div class="msg">
            <p>{message}</p>
            <Moment format="YYYY/MM/DD hh:mma">{date}</Moment>
          </div>
        </li>
      </React.Fragment>
    );
  }
}
