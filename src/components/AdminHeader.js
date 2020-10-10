import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: [{ count: "" }],
      tempCount: [{ count: "" }],
    };
  }

  componentDidMount() {
    const uid = this.props.uid;
    var userData = JSON.parse(localStorage.getItem("sessionData"));
    if (userData == null || userData.user_type !== "ADMIN") {
      this.props.logout();
    }
    var url = `/messages/AdminUnreadCount?uid=${uid}`;
    axios.get(`${url}`).then((res) => this.setState({ unreadCount: res.data }));
    const interval = setInterval(() => {
      this.updateCount();
    }, 1000);
    return () => clearInterval(interval);
  }

  updateCount = () => {
    const uid = this.props.uid;
    var url = `/messages/AdminUnreadCount?uid=${uid}`;
    axios.get(`${url}`).then((res) => this.setState({ tempCount: res.data }));

    if (this.state.unreadCount[0].count !== this.state.tempCount[0].count) {
      this.setState({ unreadCount: this.state.tempCount });
    }
  };
  render() {
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
          <Link class="navbar-brand" to="/AdminHome">
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
              <span style={{ marginLeft: "-5px" }}>Found</span>
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
                class="nav-link"
                to="/AdminHome"
                style={{ marginLeft: "10px" }}
              >
                Home <span class="sr-only">(current)</span>
              </Link>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <Link class="nav-link" to="/AdminHome/inbox">
                  Inbox <span class="sr-only">(current)</span>
                  <span class="badge">{countString}</span>
                </Link>
              </li>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <Link class="nav-link" to="/AdminHome/claims">
                  Claims <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <Link
                  to="/AdminHome/myItems"
                  class="nav-link"
                  style={{ marginLeft: "-3px" }}
                >
                  My Items <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li class="nav-item " style={{ marginLeft: "10px" }}>
                <form
                  onSubmit={this.props.search}
                  class="form-inline my-2 my-lg-0"
                >
                  <div class="input-group mb-3" style={{ width: "350px" }}>
                    <input
                      onChange={this.props.searchTextOnChange}
                      value={this.props.searchKey}
                      type="text"
                      class="form-control"
                      placeholder="Search"
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
              <div class="nav-link">
                <i class="fa fa-sign-out"></i>
                <Link onClick={this.props.logout}> Logout </Link>
                <span class="sr-only">(current)</span>
              </div>
            </form>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
