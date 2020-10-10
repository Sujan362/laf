import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import MessageItems from "./MessageItems.js";
import UIfx from "uifx";
import bellAudio from "../assets/bell.mp3";

export default class ShowMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      tempMessageList: [],
      message: "",
      uid: "",
      itemId: "",
      userType: "",
      redirect: false,
      itemDetail: [],
      claimDetail: [],
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const itemId = params.itemId;
    const studentId = params.studentId;
    const userType = params.userType;
    this.setState({ uid: studentId, itemId: itemId, userType: userType });
    var url = `/messages/itemMessage?uid=${studentId}&itemId=${itemId}`;
    axios
      .get(`/messages/getUserInfo?uid=${studentId}`)
      .then((res) => this.setState({ claimDetail: res.data }))
      .then();
    axios
      .get(`${url}`)
      .then((res) =>
        this.setState({ messageList: res.data, tempMessageList: res.data })
      )
      .then((update) => {
        update = this.scrollToBottom();
      });

    axios
      .get(`/laf/${itemId}`)
      .then((res) => this.setState({ itemDetail: res.data }));
    const interval = setInterval(() => {
      this.updateChat("play");
    }, 1000);
    return () => clearInterval(interval);
  }

  onChangeMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  updateChat = (e) => {
    const uid = this.state.uid;
    const itemId = this.state.itemId;
    var url = `/messages/itemMessage?uid=${uid}&itemId=${itemId}`;
    axios
      .get(`${url}`)
      .then((res) => this.setState({ tempMessageList: res.data }));
    let temp = [...this.state.tempMessageList];
    if (this.state.tempMessageList.length !== this.state.messageList.length) {
      this.setState({ messageList: temp });
      this.scrollToBottom();
      const bell = new UIfx(bellAudio, {
        volume: 0.4, // number between 0.0 ~ 1.0
        throttleMs: 100,
      });
      if (e === "play") {
        bell.play();
      }
    }
  };

  handleSubmit(event) {
    event.preventDefault();
    var currentdate = new moment().format("YYYY-MM-DD HH:mm:ss");
    const uid = this.state.uid;
    const itemId = this.state.itemId;
    const message = this.state.message;
    var sender = this.state.userType;
    this.setState({ message: "" });
    axios
      .post(
        `/messages?date=${currentdate}&uid=${uid}&itemId=${itemId}&message=${message}&sender=${sender}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .then((update) => {
        update = this.updateChat("noplay");
        update = this.scrollToBottom();
      });
  }

  render() {
    var image = this.state.itemDetail.item_image;
    if (image === undefined) {
      image = "avatar.jpg";
    }
    return (
      <React.Fragment>
        <br />
        <div class="container15">
          <h4 id="chatname">{this.state.itemDetail.item_name}</h4>
          <h7 id="chatpHeadName2">{this.state.claimDetail.first_name} </h7>
          <img src={require(`../assets/images/${image}`)} id="chatHeadImg" />
          <h4 id="sectionname">Section: {this.state.itemDetail.post_type} </h4>
          <hr id="hrname" />

          <br />
          <ol class="chat">
            <MessageItems
              messageList={this.state.messageList}
              userType={this.state.userType}
            />
            <li
              style={{ marginTop: "-10px" }}
              ref={(el) => {
                this.messagesEnd = el;
              }}
            ></li>
          </ol>

          <div class="container wpace">
            <form class="example" onSubmit={this.handleSubmit}>
              <input
                type="text"
                onChange={this.onChangeMessage}
                placeholder="Type your message here.."
                value={this.state.message}
              />
              <button id="sendButtonChat" type="submit" value="submit">
                Send
              </button>
            </form>
            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
