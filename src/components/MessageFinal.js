import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import axios from "axios";

export default class MessageFinal extends Component {
  state = {
    userDetail: [],
  };
  componentDidMount() {
    const studentId = this.props.messageInfo.studentId;
    axios
      .get(`/messages/getUserInfo?uid=${studentId}`)
      .then((res) => this.setState({ userDetail: res.data }));
  }
  render() {
    const itemId = this.props.itemInfo.item_id;
    const studentId = this.props.messageInfo.studentId;
    const itemName = this.props.itemInfo.item_name;
    const messageDate = this.props.messageInfo.messageDate;
    const messageText = this.props.messageInfo.messageText;
    const count = this.props.messageInfo.count;
    const userType = this.props.userType;
    var image = this.props.itemInfo.item_image;
    var url = `/StudentHome/messages/${studentId}/${itemId}/${userType}`;
    if (userType === "ADMIN") {
      url = `/AdminHome/messages/${studentId}/${itemId}/${userType}`;
    }
    if (image === undefined) {
      image = "avatar.jpg";
    }
    var countString = "";
    if (count === 0) {
      countString = "";
    } else {
      countString = `${count}`;
    }
    return (
      <React.Fragment>
        <Link id="a" to={url}>
          <div class="cont12">
            <div class="container12">
              <img
                class="img-circle"
                width="80"
                height="80"
                src={require(`../assets/images/${image}`)}
                alt="Avatar"
              />
              <h3 id="chatpHead">{itemName} </h3>
              <h7 id="chatpHeadName">{this.state.userDetail.first_name} </h7>
              <div class="badge" id="secondaryBadge">
                {countString}
              </div>
              <p id="chatp">{messageText}</p>

              <span class="timeconvo">
                <Moment format="YYYY/MM/DD hh:mma">{messageDate}</Moment>
              </span>
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
