import React, { Component } from "react";
import "../assets/css/Header.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { render } from "@testing-library/react";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: [{ count: "" }],
      tempCount: [{ count: "" }],
      searchKey: "",
    };
  }

  componentDidMount() {
    const uid = this.props.uid;
    var userData = JSON.parse(localStorage.getItem("sessionData"));
    if (userData == null || userData.user_type !== "STUDENT") {
      this.props.logout();
    }
    var url = `/messages/unreadCount?uid=${uid}`;
    console.log(this.props.userInfo);
    axios.get(`${url}`).then((res) => this.setState({ unreadCount: res.data }));
    const interval = setInterval(() => {
      this.updateCount();
    }, 1000);
    return () => clearInterval(interval);
  }

  updateCount = () => {
    const uid = this.props.uid;
    var url = `/messages/unreadCount?uid=${uid}`;
    axios.get(`${url}`).then((res) => this.setState({ tempCount: res.data }));

    if (this.state.unreadCount[0].count !== this.state.tempCount[0].count) {
      this.setState({ unreadCount: this.state.tempCount });
    }
  };

  render() {
    const imgStyle = {
      marginLeft: -90,
      marginRight: -110,
    };

    const spanStyle = {
      marginLeft: "-5px",
    };
    var count = this.state.unreadCount[0].count;
    var countString = "";
    if (count === 0 || count === null) {
      countString = "";
    } else {
      countString = `${count}`;
    }

    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-md  navbar sticky-top">
          <Link class="navbar-brand" to="/StudentHome">
            {" "}
            <h3>
              Lost
              <span
                style={{
                  background: "-webkit-linear-gradient(-360deg,#E0AC1C,white )",
                  webkitBackgroundClip: "text",
                  webkitTextFillColor: "transparent",
                  fontSize: "40px",
                }}
              >
                {" "}
                &{" "}
              </span>
              <span style={spanStyle}>Found</span>
            </h3>
          </Link>
          <button
            class="navbar-toggler ml-auto custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginTop: "10px", marginBottom: "-10px" }}
          >
            <ul class="navbar-nav mr-auto">
              <Link
                to="/StudentHome"
                class="nav-link"
                style={{ marginLeft: "10px" }}
              >
                Home <span class="sr-only">(current)</span>
              </Link>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <Link class="nav-link" to="/StudentHome/inbox">
                  Inbox <span class="sr-only">(current)</span>
                  <span class="badge">{countString}</span>
                </Link>
              </li>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <Link
                  to="/StudentHome/myItems"
                  class="nav-link"
                  style={{ marginLeft: "-3px" }}
                >
                  My Items <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <form
                  class="form-inline my-2 my-lg-0"
                  onSubmit={this.props.search}
                >
                  <div class="input-group mb-3" style={{ width: "350px" }}>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      onChange={this.props.searchTextOnChange}
                      value={this.props.searchKey}
                    />
                    <div class="input-group-append">
                      <button class="btn" type="submit">
                        <i class="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <div class="nav-link">{this.props.userInfo.first_name}</div>
              <div class="nav-link">
                <i class="fa fa-sign-out"></i>{" "}
                <Link onClick={this.props.logout}>Logout </Link>
                <span class="sr-only">(current)</span>
              </div>
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
